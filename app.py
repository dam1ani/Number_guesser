from flask import Flask, request, jsonify, render_template
import json
import numpy as np
import tensorflow as tf
app = Flask(__name__)



@app.route('/')
def hello_world():  # put application's code here
    return render_template("index.html")


@app.route("/",methods=["POST"])
def predict():
    value_array = json.loads(request.data)
    print(len(value_array))
    nparray = np.array(value_array)
    nparray = np.reshape(nparray,(1,28,28))
    nparray = nparray.astype(np.float32)
    # Load the TFLite model and allocate tensors.
    interpreter = tf.lite.Interpreter(model_path="model.tflite")
    interpreter.allocate_tensors()

    # Get input and output tensors.
    input_details = interpreter.get_input_details()
    output_details = interpreter.get_output_details()

    # Test the model on random input data.
    input_shape = input_details[0]['shape']
    print("Input Shape:", input_shape)
    input_data = nparray
    interpreter.set_tensor(input_details[0]['index'], input_data)

    interpreter.invoke()

    # The function `get_tensor()` returns a copy of the tensor data.
    # Use `tensor()` in order to get a pointer to the tensor.
    output_data = interpreter.get_tensor(output_details[0]['index'])
    print(np.argmax(output_data))

    return jsonify(key1=str(np.argmax(output_data)))


if __name__ == '__main__':
    app.run()
