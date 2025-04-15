from flask import Flask, render_template, request, make_response
import redis
import os
import socket

app = Flask(__name__)
redis_client = redis.Redis(host='redis', port=6379, db=0)

@app.route("/", methods=['POST', 'GET'])
def hello():
    voter_id = request.cookies.get('voter_id')
    if not voter_id:
        voter_id = hex(hash(socket.gethostname()))[2:]

    vote = None
    if request.method == 'POST':
        vote = request.form['vote']
        redis_client.rpush('votes', vote)

    resp = make_response(render_template(
        'index.html',
        option_a=os.getenv('OPTION_A', 'Cats'),
        option_b=os.getenv('OPTION_B', 'Dogs'),
        hostname=socket.gethostname(),
        vote=vote,
    ))
    resp.set_cookie('voter_id', voter_id)
    return resp

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80)