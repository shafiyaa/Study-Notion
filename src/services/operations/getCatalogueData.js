import React from 'react'
import { apiConnector } from '../apiConnector'
import { catalogueData } from '../apiLink'
import { toast } from 'react-hot-toast'

const { CATALOGUEPAGEDATA_API} = catalogueData


export  const getCatalogueData = async(categoryId) => {

  let result = []
  
  try{
    const response = await apiConnector("POST", CATALOGUEPAGEDATA_API,{categoryId: categoryId})
    
    if(!response?.data?.success)
    {
      throw new Error("Could Not Fetch Category Page Details")
    }
    
    result = response?.data


  }catch(error){
     console.log("Error in get Catalogue Data")
     toast.error("Cannot get the Catalogue")
     result = error.response?.data
  }
 return result
}




