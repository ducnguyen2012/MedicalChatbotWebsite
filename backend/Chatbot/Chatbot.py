from dotenv import load_dotenv
import google.generativeai as genai
import os
from langchain.text_splitter import RecursiveCharacterTextSplitter
from pypdf import PdfReader
from langchain.vectorstores import FAISS
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains.question_answering import load_qa_chain
from langchain.prompts import PromptTemplate
from langchain_google_genai import GoogleGenerativeAIEmbeddings
#! env stuff
load_dotenv()
genai.configure(api_key=os.environ["APIKEY"])

PDF_PATH = os.getcwd() + "\\Chatbot\\mydataEnglish.pdf"

#! preprocessing text from pdf
def get_pdf_text(pdf_path):
    '''
    This function can preprocess text
    '''
    text = ""
    if not os.path.exists(pdf_path):
        return "PDF PATH NOT EXIST!"
    
    pdf_reader = PdfReader(pdf_path)
    for page in pdf_reader.pages:
        text += page.extract_text()            
    return text

#! get text chunk
def get_text_chunks(text):
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=5000, chunk_overlap = 1000)
    chunks = text_splitter.split_text(text)
    return chunks

#! get vector store
def get_vector_store(text_chunks):
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    vector_store = FAISS.from_texts(text_chunks, embeddings)
    vector_store.save_local("faiss_index")
    
'''
update: khong nen de prompt la tieng viet
'''
#! get comversation chain:
def get_conversational_chain():
    prompt_templace = """
    Answer the question in as detailed manner as possible from the provided context, make sure to provide all the details, if the answer is not in the provided
    context then just say, "answer is not available in the context", dont provide the wrong answer. \
    Answer all the question in Vietnamese!
    \n\n
    Context:\n {context}?\n
    Question:\n {question}\n

    Answer:
    """
    
    model = ChatGoogleGenerativeAI(model="gemini-pro", temperature=0.3)
    
    prompt = PromptTemplate(template = prompt_templace, input_variables=["context", "question"])
    chain = load_qa_chain(model, chain_type="stuff", prompt=prompt)
    return chain
    
    
def user_input(user_question):
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    new_db = FAISS.load_local("faiss_index", embeddings, allow_dangerous_deserialization=True)
    docs = new_db.similarity_search(user_question)
    chain = get_conversational_chain()
    res = chain({"input_documents": docs, "question": user_question}, return_only_outputs=True)
    
    return res['output_text']
# model = genai.GenerativeModel("gemini-1.5-flash")
# response = model.generate_content("Write a story about a student")
# print(response.text)

def chatbotFunction(user_question):
    if (user_question):
        raw_text = get_pdf_text(PDF_PATH)
        text_chunks = get_text_chunks(raw_text)
        print(text_chunks)
        get_vector_store(text_chunks)
        return user_input(user_question)
    else:
        return "please enter your question!"
    



    


