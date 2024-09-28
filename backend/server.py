from flask import Flask, request, jsonify
# from flask_cors import CORS 
from Chatbot.Chatbot import chatbotFunction
app=Flask(__name__)
# CORS(app)
@app.route("/chatbot", methods=["POST"])
def chatbot():
    data = request.get_json()
    if data is None:
        print("Can not find data!")
    else:
        print("This is my data: ", str(data))
    message = data.get('message', '') # lay message value in input
    botResponse = chatbotFunction(message)
    response = f"bot response: {botResponse}"
    #print("This is my message: ",message)
    
    #! response se duoc bat boi fetch
    return jsonify({'response': response})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
