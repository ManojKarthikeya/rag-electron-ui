from transformers import AutoTokenizer, AutoModelForCausalLM
from langchain_community.embeddings import OllamaEmbeddings
from langchain_community.llms import Ollama
from sentence_transformers import SentenceTransformer
import pymongo
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

mongo_uri = "mongodb+srv://manojkarthikeya:qeGvclRG5adlMOeD@cluster0.41fkna5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
db = "movies"
collection = "movie_collection_2"

# initialize db connection
connection = pymongo.MongoClient(mongo_uri)
collection = connection[db][collection]

embedding_model = SentenceTransformer("thenlper/gte-large")


def get_embedding(text: str) -> list[float]:
    if not text.strip():
        print("Attempted to get embedding for empty text.")
        return []
    embedding = embedding_model.encode(text)
    return embedding.tolist()


def vector_search(user_query):
    """
    Perform a vector search in the MongoDB collection based on the user query.
    Args:
    user_query (str): The user's query string.
    collection (MongoCollection): The MongoDB collection to search.

    Returns:
    list: A list of matching documents.
    """

    query_embedding = get_embedding(user_query)

    if query_embedding is None:
        return "Invalid query or embedding generation failed."

    pipeline = [
        {
            "$vectorSearch": {
                "index": "vector_index",
                "queryVector": query_embedding,
                "path": "embedding",
                "numCandidates": 150,  # Number of candidate matches to consider
                "limit": 3,  # Return top 4 matches
            }
        },
        {
            "$project": {
                "_id": 0,  # Exclude the _id field
                "fullplot": 1,  # Include the plot field
                "plot": 1,
                "title": 1,  # Include the title field
                "genres": 1,  # Include the genres field
                "poster" : 1,
                "score": {"$meta": "vectorSearchScore"},  # Include the search score
            }
        },
    ]
    results = collection.aggregate(pipeline)
    return list(results)


def get_search_result(vector_search_results):
    get_knowledge = vector_search_results
    search_result = ""
    for result in get_knowledge:
        search_result += f"Title: {result.get('title', 'N/A')}, Plot: {result.get('fullplot', 'N/A')}\n"
    return search_result


@app.route("/vectorsearch", methods=["POST"])
def vectorsearch():
    data = request.get_json()
    print(data["query"])
    return {"response" : vector_search(data["query"])}

app.run()