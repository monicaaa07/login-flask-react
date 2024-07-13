# PREREQUISITES:
Node: 20
python 3.9
pip package manager installed or docker desktop
npm package manager for node


# HOW TO RUN THIS PROJECT

** Run the Flask server ** in either docker on non-docker environment.  
    1) cd in backend folder: cd backend.

    To execute in Python docker enviromemt: 
    2) Build docker image : docker build -t backend .
    3) Run container : docker run -p 5000:5000 backend

    To execute in non docker  environment:
    2)Setup Virtual Environment (Optional but Recommended): python -m venv venv
    3)source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    4)Install Dependencies: cd backend
                            pip install -r requirements.txt
    5) Run Flask Application: python app.py
The Flask app should now be running at http://localhost:5000.


** Running React Frontend
    1) Install Dependencies: cd frontend
                             npm install
    2) Run React Application: npm run dev
The React app should now be running at http://localhost:3000.

On 3000 you should see a login screen as below:
![Alt text](<Screenshot 2024-07-13 at 2.38.33 AM.png>)

Login using user :  'setosa_user@example.com' for  'Iris-setosa' plots  OR   'virginica_user@example.com' for 'Iris-virginica' plots

A scatter plot as below will be displayed:
![Alt text](<Screenshot 2024-07-13 at 2.38.08 AM.png>)

# About the App

The App uses a flask backend and react  frontend created using Vite. It has a login which currently supports 2 email Ids: 'setosa_user@example.com' &  'virginica_user@example.com'. Once they are validated, a token is sent from the server to u\UI which is saved in browser cookies to savethe session. The logout function, clears the cookies. Based on the user, data is conditionally returned from the server and displayed as scatter plots.

# full_stack_sample_problem

In this folder you will find the well know Iris data set. You may use the version included or download scikit-learn and use the copy included in the distribution:

https://scikit-learn.org/stable/auto_examples/datasets/plot_iris_dataset.html

## Goals
Please create a Flask app with a React frontend. 

You do not need to set up a database, feel free to use flat files to set up any data you need.

Create at least two users. One of which has access to only the Setosa variety of data and one of which has access to only the Virginica variety of data.

Your app should have a sign in page. - The username should be an email. Please include validation for this in the React app.

After signing in the user should be able to view two plots. The first plot should have sepal.length on the X axis and size on the Y axis. There should be three series plotted: sepal.width, petal.length, and petal.width. Please create checkboxes for each series, so that if a box is checked it's data will show up on the plot. Please also create a two sided slider which controls the upper and lower bound of the Y axis.

The second plot should be exactly like the first, but should have petal.length on the X-axis.

On the dashboard page there should be a button that says "logout" in the top right which will take the user back to the login page.

## Expectations

You will have 72 hours from the time you recieve this email to complete as much of this excercise as possible. Please respond to this email with your progress. Your folder should include a requirements.txt for the python packages you use and package.json for the javascript packages you use. We do not expect you to complete the entire task. The goal is to see what you can come up with with 4-5 hours of work. You will be assesed based on the quality, and clairity of the code, code comments, commit comments, and app functionality.