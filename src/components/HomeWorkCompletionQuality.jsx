import {Typography} from "@mui/material";
import {PieChart} from "@mui/x-charts/PieChart";
import Box from "@mui/material/Box";
import * as React from "react";

const pieChartData = [
    {id: 0, value: 10, label: '0-50%'},
    {id: 1, value: 15, label: '50-75%'},
    {id: 2, value: 20, label: '76-100%'},
]
export const HomeWorkCompletionQuality = () => {
    return (
        <Box sx={{height: '100%', bgcolor: "#fff", p: 2, mr: 3}}>
            <Typography variant="h4" sx={{textAlign: 'center',}}>Homework completion quality</Typography>
            <PieChart
                series={[
                    {
                        data: pieChartData,
                        innerRadius: 50,
                        outerRadius: 150,
                        paddingAngle: 5,
                        cornerRadius: 5,
                        cy: 180,

                    },
                ]}

                height={400}
            />
        </Box>
    )
}
