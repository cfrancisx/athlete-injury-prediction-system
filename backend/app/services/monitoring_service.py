import asyncio
import json
from datetime import datetime
from kafka import KafkaConsumer, KafkaProducer
from app import mongo
from app.services.prediction_service import PredictionService

class RealTimeMonitoringService:
    def __init__(self):
        self.prediction_service = PredictionService()
        self.kafka_consumer = None
        self.kafka_producer = None
        self.is_running = False
        
    def start_monitoring(self):
        """Start real-time monitoring of sensor data"""
        try:
            self.kafka_consumer = KafkaConsumer(
                'sensor-data',
                bootstrap_servers=['localhost:9092'],
                auto_offset_reset='latest',
                enable_auto_commit=True,
                group_id='injury-prediction-group',
                value_deserializer=lambda x: json.loads(x.decode('utf-8'))
            )
            
            self.kafka_producer = KafkaProducer(
                bootstrap_servers=['localhost:9092'],
                value_serializer=lambda x: json.dumps(x).encode('utf-8')
            )
            
            self.is_running = True
            self._process_sensor_data()
            
        except Exception as e:
            print(f"Error starting monitoring service: {e}")
    
    def _process_sensor_data(self):
        """Process incoming sensor data in real-time"""
        for message in self.kafka_consumer:
            if not self.is_running:
                break
                
            sensor_data = message.value
            self._analyze_sensor_data(sensor_data)
    
    def _analyze_sensor_data(self, sensor_data):
        """Analyze sensor data and generate predictions"""
        try:
            # Store raw sensor data in MongoDB
            mongo.db.sensor_data.insert_one({
                **sensor_data,
                'processed_at': datetime.utcnow()
            })
            
            # Extract features for prediction
            features = self._extract_features(sensor_data)
            
            # Get real-time prediction
            prediction = self.prediction_service.predict_real_time_risk(features)
            
            # Send alert if high risk
            if prediction['risk_level'] == 'high':
                self._send_alert(sensor_data['athlete_id'], prediction)
                
        except Exception as e:
            print(f"Error analyzing sensor data: {e}")
    
    def _extract_features(self, sensor_data):
        """Extract relevant features from sensor data"""
        features = {
            'heart_rate': sensor_data.get('heart_rate'),
            'heart_rate_variability': sensor_data.get('hrv'),
            'acceleration_x': sensor_data.get('accel_x'),
            'acceleration_y': sensor_data.get('accel_y'),
            'acceleration_z': sensor_data.get('accel_z'),
            'gyro_x': sensor_data.get('gyro_x'),
            'gyro_y': sensor_data.get('gyro_y'),
            'gyro_z': sensor_data.get('gyro_z'),
            'temperature': sensor_data.get('temperature'),
            'humidity': sensor_data.get('humidity')
        }
        return features
    
    def _send_alert(self, athlete_id, prediction):
        """Send real-time alert for high-risk situations"""
        alert_message = {
            'athlete_id': athlete_id,
            'timestamp': datetime.utcnow().isoformat(),
            'risk_level': prediction['risk_level'],
            'risk_score': prediction['risk_score'],
            'recommendations': prediction['recommendations'],
            'alert_type': 'high_risk_warning'
        }
        
        # Send to alerts topic
        self.kafka_producer.send('alerts', alert_message)
        print(f"High risk alert sent for athlete {athlete_id}")
    
    def stop_monitoring(self):
        """Stop the monitoring service"""
        self.is_running = False
        if self.kafka_consumer:
            self.kafka_consumer.close()
        if self.kafka_producer:
            self.kafka_producer.close()