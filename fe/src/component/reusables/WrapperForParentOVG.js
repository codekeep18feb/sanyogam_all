import React from 'react'
import { Grid, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

export default function WrapperForParentOVG({ children, family_details,rules }) {
    console.log('family_detadfils',family_details, rules)
    const handleEditClick = () => {
        navigate("/edit_family", { state: { family_details } });
    };
    const navigate = useNavigate();

    const all_childs = children.map((row)=>{
        const rule = rules[row]
        console.log('HWERWEQ',rules, row)
        return (
            <div style={{ display: "flex", padding: "10px 0" }}>
                    {row}
            </div>
        )
    })

    return (
        <>
            <Grid container flexDirection={"column"}>
                <Grid
                    container
                    justifyContent="space-between"
                    sx={{ padding: "5px 10px 0 10px" }}
                >
                    <Grid item>
                        <div>wrapper title</div>
                    </Grid>

                    <div style={{ display: "flex" }}>
                        <div
                            style={{ opacity: 0.8, cursor: "pointer" }}
                            onClick={handleEditClick}
                        >
                            <Typography variant="subtitle2">Edit</Typography>
                        </div>

                        <EditIcon
                            style={{
                                fontSize: "17px",
                                color: "blue",
                                marginLeft: "5px",
                                cursor: "pointer",
                            }}
                            onClick={handleEditClick}
                        />
                    </div>
                </Grid>
                {all_childs}

                


            </Grid>
        </>
    )
}
