prediction_1 = ""
prediction_2 = ""

Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
  });

camera = document.getElementById("camera");

Webcam.attach('#camera');

      
function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

  console.log('ml5 version:', ml5.version);
  
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/cHQsnnquV/model.json',modelLoaded);

  function modelLoaded() {
    console.log('Model Loaded!');
  }
  
function speak(){
  var synth = window.speechSynthesis;
  speak_data_1 = "La primera prediccion es " + prediction_1;
  speak_data_2 = "Y la segunda prediccion es " + prediction_2;
  var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
  synth.speak(utterThis);
}


  function check()
  {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
  }

  function gotResult(error,result) {
    if (error) {
        console.error();
    } else {
        console.log(result);
        document.getElementById("result_object_name").innerHTML = result[0].label;
        document.getElementById("result_object_name").innerHTML = result[1].label;
        prediction_1 = result[0].label;
        prediction_2 = result[1].label;
        
        if(result[0].label == "Ok") {
            document.getElementById("result_object_name").innerHTML = "&#128076;";
        }
        if(result[0].label == "Bien") {
            document.getElementById("result_object_name").innerHTML = "&#128077;";
        }
        if(result[0].label == "Amor y paz") {
            document.getElementById("result_object_name").innerHTML = "&#9996;";
        }
        if(result[1].label == "Bien") {
            document.getElementById("result_object_name").innerHTML = "&#9996;";
        }
        if(result[1].label == "Amor y paz") {
            document.getElementById("result_object_name").innerHTML = "&#128077;";
        }
        if(result[1].label == "Ok") {
            document.getElementById("result_object_name").innerHTML = "&#128076;";
        }
    }
  }