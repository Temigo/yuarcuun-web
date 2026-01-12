// useRecorder hook
import { __awaiter, __generator } from "tslib";
import { useState, useEffect, useRef } from 'react';
// import { useAudioLevels } from './useAudioLevels';
var useRecorder = function () {
    var _a = useState('idle'), recordingState = _a[0], setRecordingState = _a[1];
    var _b = useState(''), audioURL = _b[0], setAudioURL = _b[1];
    var _c = useState(0), time = _c[0], setTime = _c[1];
    var _d = useState(null), blob = _d[0], setBlob = _d[1];
    var timerRef = useRef();
    var mediaRecorderRef = useRef();
    var streamRef = useRef(null); //CODE ADDED
    // var audioLevel = useAudioLevels(recordingState === 'recording');  //CODE ADDED
    var _e = useState(null), audioFile = _e[0], setAudioFile = _e[1];
    // Function to start recording
    var startRecording = function () { return __awaiter(void 0, void 0, void 0, function () {
        var stream, chunks;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setRecordingState('recording');
                    setTime(0);
                    timerRef.current = window.setInterval(function () {
                        setTime(function (prevTime) { return prevTime + 1; });
                    }, 1000);
                    return [4 /*yield*/, navigator.mediaDevices.getUserMedia({ audio: true })];
                case 1:
                    stream = _a.sent();
                    streamRef.current = stream  //CODE ADDED
                    mediaRecorderRef.current = new MediaRecorder(stream);
                    chunks = [];
                    mediaRecorderRef.current.ondataavailable = function (e) { return chunks.push(e.data); };
                    mediaRecorderRef.current.onstop = function () {
                        var blob = new Blob(chunks, { type: 'audio/mpeg' });
                        setBlob(blob);
                        setAudioURL(URL.createObjectURL(blob));
                        var audioFile = new File([blob], 'recorded_audio.mp3', {
                            type: 'audio/mpeg',
                        });
                        setAudioFile(audioFile);

                    };
                    mediaRecorderRef.current.start();
                    return [2 /*return*/];
            }
        });
    }); };
    // Function to pause recording
    var pauseRecording = function () {
        var _a;
        setRecordingState('paused');
        clearInterval(timerRef.current);
        (_a = mediaRecorderRef.current) === null || _a === void 0 ? void 0 : _a.pause();
    };
    // Function to stop recording
    var resumeRecording = function () {
        var _a;
        setRecordingState('recording');
        timerRef.current = window.setInterval(function () {
            setTime(function (prevTime) { return prevTime + 1; });
        }, 1000);
        (_a = mediaRecorderRef.current) === null || _a === void 0 ? void 0 : _a.resume();
    };
    // Add a function to reset recording
    var resetRecording = function () {
        setRecordingState('idle');
        setAudioURL('');
        setTime(0);
    };
    var stopRecording = function () {
        var _a;
        setRecordingState('stopped');
        clearInterval(timerRef.current);
        (_a = mediaRecorderRef.current) === null || _a === void 0 ? void 0 : _a.stop();
        streamRef.current.getTracks().forEach(track => track.stop());  //CODE ADDED
        streamRef.current = null;  //CODE ADDED
    };
    useEffect(function () {
        return function () {
            clearInterval(timerRef.current);
        };
    }, []);
    return {
        // audioLevel: audioLevel,
        startRecording: startRecording,
        pauseRecording: pauseRecording,
        resumeRecording: resumeRecording,
        stopRecording: stopRecording,
        resetRecording: resetRecording,
        timeElapsed: time,
        recordingState: recordingState,
        isRecording: recordingState === 'recording',
        audioURL: audioURL,
        audioFile: audioFile,
        audioBlob: blob,
    };
};
export default useRecorder;
//# sourceMappingURL=useRecorder.js.map