from flask import Flask, request,  jsonify, make_response
import time


app = Flask(__name__, static_url_path='/static')


@app.route("/api/user",  methods=["GET",  "DELETE"])
# Работа с сущностью пользователь
def user():
    print("work api user ", request.method)

    time.sleep(1)

    if request.method == "GET":
        return make_response(jsonify("user get ok"), 200)

    if request.method == "POST":
        user = request.get_json()
        print(user)

        return make_response(jsonify("user post ok"), 200)

    if request.method == "DELETE":
        user = request.get_json()
        print(user)
        return make_response(jsonify("user delete ok"), 200)


@app.route("/api/product",  methods=["POST", "DELETE"])
# Работа с сущностью продукт
def product():
    print("work api product ", request.method)

    time.sleep(1)

    if request.method == "GET":
        return make_response(jsonify("product get ok"), 200)

    if request.method == "POST":
        user = request.get_json()
        print(user)

        return make_response(jsonify("product post ok"), 200)

    if request.method == "DELETE":
        user = request.get_json()
        print(user)
        return make_response(jsonify("product delete ok"), 200)


if __name__ == "__main__":
    app.run(port=7000, debug=True)
