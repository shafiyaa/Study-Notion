  import {createSlice} from "@reduxjs/toolkit"

const initialState ={
    courseSectionData : [],
    courseEntireData : [],
    completed:[],
    totalNoOfLectures: 0,
}

const viewCourseSlice = createSlice( {
    name: "viewCourse",
    initialState,
    reducers: {
        setCourseSectionData: (state, action) =>{
            state.courseSectionData = action.payload
        },
        setEntireCourseData: (state, action) => {
            state.courseEntireData = action.payload
          },
          setCompletedLectures: (state, action) => {
            state.completedLectures = action.payload
          },
          setTotalNoOfLectures: (state, action) => {
            state.totalNoOfLectures = action.payload
          },
          updateCompletedLectures: (state, action) =>{
            state.completed = [...state.completed, action.payload]
          }
    }
})

export const {
    setCourseSectionData,
    setEntireCourseData,
    setTotalNoOfLectures,
    setCompletedLectures,
    updateCompletedLectures,
} = viewCourseSlice.actions

export default viewCourseSlice.reducer