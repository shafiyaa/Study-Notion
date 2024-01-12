import React, { useState } from 'react'
import { Chart, registerables } from "chart.js"
import { Pie } from "react-chartjs-2"

Chart.register(...registerables);

const InstructorChart = ({ courses }) => {

    const [currChart, setCurrChart] = useState("students")


    //functio to genertae random colors
    const getRandomColors = (numColors) => {
        const colors = [];
        for (let i = 0; i < numColors; i++) {
            const color = `rgb(${Math.floor(Math.random() * 256)}, 
                               ${Math.floor(Math.random() * 256)},
                               ${Math.floor(Math.random() * 256)})`
            colors.push(color);
        }
        return colors;
    }

    // data for students
    const chartDataForStudents = {
        labels: courses.map((course) => course.courseName),
        datasets: [
            {
                data: courses.map((course) => course.totalStudentsEnrolled),
                backgroundColor: getRandomColors(courses.length)
            }
        ]
    }


    // data for income
    const chartDataForIncome = {
        labels: courses.map((course) => course.courseName),
        datasets: [
            {
                data: courses.map((course) => course.totalAmountGenerated),
                backgroundColor: getRandomColors(courses.length)
            }
        ]
    }

    return (
        <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 py-6 px-2 sm:px-6 ">
            <p className="text-lg font-bold text-richblack-5">Visualise</p>

            <div className='flex gap-x-5 font-semibold'>

                <button onClick={() => setCurrChart("students")}
                className={`rounded-sm p-1 px-3 transition-all duration-200 ${
                    currChart === "students"
                      ? "bg-richblack-700 text-yellow-50"
                      : "text-yellow-400"
                  }`}
                >Student</button>

                <button onClick={() => setCurrChart("income")}
                 className={`rounded-sm p-1 px-3 transition-all duration-200 ${
                    currChart === "income"
                      ? "bg-richblack-700 text-yellow-50"
                      : "text-yellow-400"
                  }`}
                >Income</button>

            </div>

            <div className=' sm:mx-auto aspect-square h-full  w-full '>
                <Pie
                    data={currChart === "students" ? chartDataForStudents : chartDataForIncome}
                ></Pie>

            </div>
        </div>
    )
}

export default InstructorChart