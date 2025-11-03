from flask import Flask, render_template, request, jsonify
import os
import datetime

app = Flask(__name__)
UPLOAD_FOLDER = 'static/uploads' # Or os.path.join(app.instance_path, 'uploads')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024 # 16 MB limit

# the default route
@app.route("/")
def index():
      return render_template("index.html")

#Task: CAPTURE & POST & FETCH & SAVE
@app.route("/t2")
def t2():
     return render_template("t2.html")

#*************************************************
# Route to receive POST data and save to text file
# Requirements 4,5,6,7
#*************************************************
@app.route("/postDataFetch", methods=['POST'])
def postDataFetch():
     # Log form data for debugging
     app.logger.info(request.form)
     
     # Get data sent from client
     form = request.form or {}
     donut = form.get('donut', 'unknown')
     message = form.get('message', '').strip()
     
     # Timestamp
     timestamp = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
     
     #5. Save the data to files/data.txt
     # Make sure folder exists
     save_dir = os.path.join(os.path.dirname(__file__), 'files')
     os.makedirs(save_dir, exist_ok=True)
     save_path = os.path.join(save_dir, 'data.txt')
     
     try:
        # Save to files/data.txt
        with open(save_path, 'a', encoding='utf-8') as f:
            f.write(f"{timestamp}\t{donut}\t{message}\n")

        #6. Send some JSON formatted message back to the user once the data has been written to the file.
        entry = {'timestamp': timestamp, 'donut': donut, 'message': message}
        return jsonify({
            "data_received": "yes",
            'saved': True,
            'entry': entry
      })
     # Handle exceptions
     except Exception as e:
        app.logger.error('Error saving postDataFetch: %s', e)
        return jsonify({
            "data_received": "yes",
            'saved': False,
            'error': str(e)
      }), 500

#run 
app.run(debug=True)
