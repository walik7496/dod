import telebot
import os
from flask import Flask
from threading import Thread

token = os.environ['token']
bot = telebot.TeleBot(token)

app = Flask('')


@app.route('/')
def home():
  return "<span style='color: red;'>I'm alive</span>"


def run():
  app.run(host='0.0.0.0', port=80)


@bot.message_handler(commands=['start'])
def start_message(message):
  bot.send_message(
    message.chat.id, "Hello, Send me your Date of Birth in <05.02.1994> (+/- 5 years old)")


@bot.message_handler(content_types='text')
def message_reply(message):
  if len(message.text) > 1:
    try:
      d = message.text
      r1 = d.replace('.', '')
      r2 = int(r1[0:2]) + int(r1[2:4]) + int(r1[4]) + int(r1[5]) + int(
        r1[6]) + int(r1[7])
      r3 = r2 + int(r1[2:4]) + int(r1[2:4]) * 2
      bot.send_message(message.chat.id, f"You will die at {r2} or {r3}")
    except:
      bot.send_message(message.chat.id, "You typed something wrong :(")

def run_bot():
    bot.polling()

t = Thread(target=run)
rn = Thread(target=run_bot, daemon=True)

t.start()
rn.start()

t.join()