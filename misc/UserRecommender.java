package com.data.itemrecommend;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
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
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

public class UserRecommender {

	@SuppressWarnings("unchecked")
	public static void main(String args[]){
		try{
			
			BufferedWriter bw = new BufferedWriter(new FileWriter("data/restaurants1.csv"));
			
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

			long userId = 39;
			List<RecommendedItem> recommendations = recommender.recommend(userId, 5);
			JSONObject jsonObj = new JSONObject();
			JSONArray  jsonList = new JSONArray();

			jsonObj.put("userId",userId);

			System.out.println("Recommendations for "+userId);
			for (RecommendedItem recommendation : recommendations) {
				jsonList.add(recommendation.getItemID());
			}

			jsonObj.put("rest_id", jsonList);

			FileWriter file = new FileWriter("datajson\\restaurantsRecommended.json");
			file.write(jsonObj.toJSONString());
			file.flush();

			System.out.print(jsonObj);

		}catch(Exception e){
			System.out.println("Exception Caught:: "+e.getMessage());
			e.printStackTrace();
		}

	}
}
