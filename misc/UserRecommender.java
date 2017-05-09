package com.data.itemrecommend;

import static com.mongodb.client.model.Projections.excludeId;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.mahout.cf.taste.impl.model.file.FileDataModel;
import org.apache.mahout.cf.taste.impl.neighborhood.ThresholdUserNeighborhood;
import org.apache.mahout.cf.taste.impl.recommender.GenericUserBasedRecommender;
import org.apache.mahout.cf.taste.impl.similarity.PearsonCorrelationSimilarity;
import org.apache.mahout.cf.taste.model.DataModel;
import org.apache.mahout.cf.taste.neighborhood.UserNeighborhood;
import org.apache.mahout.cf.taste.recommender.RecommendedItem;
import org.apache.mahout.cf.taste.recommender.UserBasedRecommender;
import org.apache.mahout.cf.taste.similarity.UserSimilarity;
import org.bson.Document;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

public class UserRecommender {

	@SuppressWarnings({ "unchecked", "resource", "rawtypes" })
	public static void main(String args[]) throws IOException{
		
		MongoClient mongoClient = new MongoClient(new MongoClientURI("mongodb://restUser:restUser123#@ds117311.mlab.com:17311/restreco"));
		
		MongoDatabase database = mongoClient.getDatabase("restreco");
		MongoCollection<Document> reviewCollection = database.getCollection("user_reviews_test");
		MongoCollection<Document> userCollection = database.getCollection("users");
		
		FileWriter fileFromMongo = new FileWriter("datajson\\restaurants.json");
		JSONArray  jsonReviewListfromMongo = new JSONArray();
		List<Long> userList = new ArrayList<Long>();
		
		FindIterable reviews = reviewCollection.find().projection(excludeId());
		FindIterable users = userCollection.find().projection(excludeId());
        
        ArrayList<Document> reviewDocs = new ArrayList();
        reviews.into(reviewDocs);
        
        for (Document review : reviewDocs) {
        	jsonReviewListfromMongo.add(review);
        } 
        
        ArrayList<Document> userDocs = new ArrayList();
        users.into(userDocs);
        
        for (Document user : userDocs) {
        	userList.add((long)user.getInteger("user_id"));
        } 
        
        fileFromMongo.write(jsonReviewListfromMongo.toJSONString());
		fileFromMongo.flush();

		try{
			
			BufferedWriter bw = new BufferedWriter(new FileWriter("data/restaurants.csv"));
			
			JSONParser parser = new JSONParser();
			Object obj = parser.parse(new FileReader("datajson/restaurants.json"));
			JSONArray jsonArray = (JSONArray) obj;
			int size = jsonArray.size();
			
			for (int i = 0; i < size; i++){
				JSONObject jsonObject = (JSONObject) jsonArray.get(i);
				long userId =  Long.valueOf((String) jsonObject.get("userid"));
				long restId = Long.valueOf((String) jsonObject.get("restid"));
				double rating = Double.valueOf((String) jsonObject.get("ratings"));
				bw.write(userId+","+restId+","+rating+"\n");
		    }
			
			bw.close();
			
			DataModel datamodel = new FileDataModel(new File("data/restaurants.csv")); 

			UserSimilarity usersimilarity = new PearsonCorrelationSimilarity(datamodel);

			UserNeighborhood userneighborhood = new ThresholdUserNeighborhood(0.0, usersimilarity, datamodel);

			UserBasedRecommender recommender = new GenericUserBasedRecommender(datamodel, userneighborhood, usersimilarity);

			for(Long user: userList){
				System.out.println("USER IS:: "+user);
			}
			
			//TESTING FOR MULTIPLE USERS BEGINS
			List<Long> userListTest = new ArrayList<Long>();
			userListTest.add((long) 2);
			userListTest.add((long) 3);
			userListTest.add((long) 4);
			
			JSONObject jsonObj;
			JSONArray  jsonList;
			List<Document> docs = new ArrayList<Document>();
			
			for(Long user: userListTest){
				List<RecommendedItem> recommendations = recommender.recommend(user, 5);
				jsonObj = new JSONObject();
				jsonList = new JSONArray();

				jsonObj.put("userId",user);

				for (RecommendedItem recommendation : recommendations) {
					jsonList.add(recommendation.getItemID());
				}
				
				jsonObj.put("rest_id", jsonList);
				
				docs.add(Document.parse(jsonObj.toJSONString()));
			}
			
			database.getCollection("user_recommended_rest").insertMany(docs);
			
			//TESTING FOR MULTIPLE USERS ENDS
			
		}catch(Exception e){
			System.out.println("Exception Caught:: "+e.getMessage());
			e.printStackTrace();
		}

	}
}
