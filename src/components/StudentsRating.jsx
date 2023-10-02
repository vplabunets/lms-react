import {Typography} from "@mui/material";
import {BarChart} from "@mui/x-charts/BarChart";
import Box from "@mui/material/Box";
import * as React from "react";


const dataset =
    [
        {name: "Olena", value: 100},
        {name: "Volodymyr", value: 90},
        {name: "Oleksandra", value: 80},
        {name: "Serhii", value: 70},
        {name: "Dmytro", value: 60},


    ]
const chartSetting = {
    xAxis: [
        {
            label: 'rating',
        },
    ],
    width: 500,
    height: 400,
};

export const StudentsRating = () => {
    return (
        <Box sx={{height: '100%', bgcolor: "#fff", p: 2, flexGrow: 2}}>
            <Typography variant="h4" sx={{textAlign: 'center',}}>Students rating</Typography>

            <BarChart
                dataset={dataset}
                yAxis={[{scaleType: 'band', dataKey: 'name'}]}
                series={[{dataKey: 'value', label: 'rating', barWidth: 5}]}
                layout="horizontal"
                {...chartSetting}
                sx={{width: '100%'}} width={1000}

            />

        </Box>
    )
}
