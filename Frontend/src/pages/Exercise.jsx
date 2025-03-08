import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import * as tf from '@tensorflow/tfjs';
import * as poseDetection from '@tensorflow-models/pose-detection';
import { Camera, Activity } from 'lucide-react';


export function ExerciseDetector() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [detector, setDetector] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState('pushup');
  const [exerciseState, setExerciseState] = useState({
    count: 0,
    status: 'neutral'
  });

  useEffect(() => {
    const initializeDetector = async () => {
      await tf.ready();
      await tf.setBackend('webgl');
      
      const model = poseDetection.SupportedModels.MoveNet;
      const detector = await poseDetection.createDetector(model, {
        modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING
      });
      
      setDetector(detector);
    };

    initializeDetector();
  }, []);

  const detectPose = async () => {
    if (!detector || !webcamRef.current || !canvasRef.current) return;

    const video = webcamRef.current.video;
    if (!video || !video.readyState) return;

    const pose = await detector.estimatePoses(video);
    if (pose.length === 0) return;

    const keypoints = pose[0].keypoints;
    drawPose(keypoints);
    analyzeExercise(keypoints);
  };

  const drawPose = (keypoints) => {
    const ctx = canvasRef.current?.getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Draw keypoints
    keypoints.forEach(keypoint => {
      if (keypoint.score && keypoint.score > 0.3) {
        ctx.beginPath();
        ctx.arc(keypoint.x, keypoint.y, 4, 0, 2 * Math.PI);
        ctx.fillStyle = 'aqua';
        ctx.fill();
      }
    });
  };

  const analyzeExercise = (keypoints) => {
    switch (selectedExercise) {
      case 'pushup':
        analyzePushup(keypoints);
        break;
      case 'pullup':
        analyzePullup(keypoints);
        break;
      case 'handRaise':
        analyzeHandRaise(keypoints);
        break;
    }
  };

  const analyzePushup = (keypoints) => {
    const shoulders = keypoints.find(kp => kp.name === 'right_shoulder');
    const elbows = keypoints.find(kp => kp.name === 'right_elbow');
    
    if (!shoulders || !elbows) return;

    const angle = calculateAngle(shoulders, elbows);
    
    if (angle < 60 && exerciseState.status === 'up') {
      setExerciseState(prev => ({
        count: prev.count + 1,
        status: 'down'
      }));
    } else if (angle > 150) {
      setExerciseState(prev => ({
        ...prev,
        status: 'up'
      }));
    }
  };

  const analyzePullup = (keypoints) => {
    // Similar logic for pullups
    // Implementation would check chin position relative to a bar
  };

  const analyzeHandRaise = (keypoints) => {
    const wrist = keypoints.find(kp => kp.name === 'right_wrist');
    const shoulder = keypoints.find(kp => kp.name === 'right_shoulder');
    
    if (!wrist || !shoulder) return;

    if (wrist.y < shoulder.y - 100 && exerciseState.status === 'down') {
      setExerciseState(prev => ({
        count: prev.count + 1,
        status: 'up'
      }));
    } else if (wrist.y > shoulder.y) {
      setExerciseState(prev => ({
        ...prev,
        status: 'down'
      }));
    }
  };

  const calculateAngle = (point1, point2) => {
    return Math.abs(Math.atan2(point2.y - point1.y, point2.x - point1.x) * 180 / Math.PI);
  };

  useEffect(() => {
    const runDetection = async () => {
      await detectPose();
      requestAnimationFrame(runDetection);
    };
    runDetection();
  }, [detector]);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Activity className="w-6 h-6" />
            Exercise Detection
          </h2>
          <div className="flex gap-2">
            {(['pushup', 'pullup', 'handRaise']).map((exercise) => (
              <button
                key={exercise}
                onClick={() => setSelectedExercise(exercise)}
                className={`px-4 py-2 rounded-md ${
                  selectedExercise === exercise
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {exercise.charAt(0).toUpperCase() + exercise.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
          <Webcam
            ref={webcamRef}
            className="absolute inset-0 w-full h-full"
            mirrored
          />
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            width={640}
            height={480}
          />
        </div>

        <div className="mt-6 text-center">
          <div className="text-4xl font-bold text-blue-500">{exerciseState.count}</div>
          <div className="text-gray-600">repetitions</div>
        </div>

        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-700 mb-2">Instructions:</h3>
          <ul className="list-disc list-inside text-gray-600">
            <li>Position yourself in front of the camera</li>
            <li>Ensure good lighting and clear background</li>
            <li>Perform the selected exercise with proper form</li>
            <li>The counter will automatically track your repetitions</li>
          </ul>
        </div>
      </div>
    </div>
  );
}