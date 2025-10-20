from flask import Flask,render_template,request
import os
import re
app = Flask(__name__)


# the default route
@app.route("/")
def index():
      return render_template("index.html")

#Task: Variables and JinJa Templates
@app.route("/t1")
def t1():
      the_topic = "donuts"
      number_of_donuts = 28
      donut_data= {
      "flavours":["Regular", "Chocolate", "Blueberry", "Devil's Food"],
      "toppings": ["None","Glazed","Sugar","Powdered Sugar",
                   "Chocolate with Sprinkles","Chocolate","Maple"]
                   }
      
      icecream_flavors = ["Vanilla","Raspberry","Cherry", "Lemon"]

      #3. Pass all the variables to the HTML template. 
      #Return the render_template with all variables to be used in the html.
      return render_template("t1.html",
                             the_topic=the_topic,
                             number_of_donuts=number_of_donuts,
                             donut_data=donut_data,
                             icecream_flavors=icecream_flavors)


#Task: HTML Form get & Data 
@app.route("/t2")
def t2():
      return render_template("t2.html")

@app.route("/thank_you_t2")
def thank_you_t2():
      # Read values from the GET query string (request.args) from form
      # The form in t2.html uses method="get" and action=url_for('thank_you_t2').
      name = request.args.get('name')
      donut = request.args.get('donut')
      notes = request.args.get('notes')

      # 5.all three data points are combined into one long string - and within this string replace each vowel with an asterisk.
      combined = f"{name} {donut} {notes}".strip()
      
      # Create masked version of combined string
      masked = ''
      # for loop to replace vowels with '*'
      # if vowel, add '*', else add original character
      for c in combined:
            if c.lower() in 'aeiouy':
                  masked += '*'
            else:
                  masked += c

      # Pass the masked combined string to the thankyou_t2.html template
      return render_template("thankyou_t2.html", combined_masked=masked)

#*************************************************

#run
app.run(debug=True)