##
#print('hello world');
##

import os;
os.environ["USE_TF"] = "0";

from transformers import pipeline;

sentiment_pipeline = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")

data = ["I love you", "I hate you"];

print(sentiment_pipeline(data));

##