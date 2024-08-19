import React, { useEffect, useState } from "react";
import styles from "./CategorySlider.module.css";
import { Card, CardContent, Typography, Tabs, Tab, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axios";

// Define the structure of category data
interface Category {
  _id: string;
  categoryName: string;
}

// Define the shape of the Redux state
interface RootState {
  DataReducer: {
    mode: string;
  };
}

const CategoriesSlider: React.FC = () => {
  const { mode } = useSelector((state: RootState) => state.DataReducer);

  const [CategoryData, setCategoryData] = useState<Category[]>([]);
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  let color: string;
  let fontColor: string;
  let btnColor: "primary" | "success";

  if (mode === "light") {
    color = "#FAFAFC";
    fontColor = "rgba(131, 131, 131,1)";
    btnColor = "primary";
  } else {
    color = "rgba(33, 35, 41,.8)";
    fontColor = "rgba(216, 140, 26,1)";
    btnColor = "success";
  }

  useEffect(() => {
    const root = document.documentElement;
    root?.style.setProperty(
      "--background-color",
      mode === "dark" ? "rgba(38, 40, 51, .5)" : "rgba(241, 237, 248, .5)"
    );
    root?.style.setProperty("--text-color", mode === "dark" ? "#fff" : "dark");
  }, [mode]);

  useEffect(() => {
    axiosInstance.get('/categories')
      .then((response) => {
        console.log("API Response:", response.data);
        setCategoryData(response.data);
        sessionStorage.setItem("CategoriesData", JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={`${styles.container} Categories`}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="Category Slider"
      >
        {CategoryData.map((currItem, index) => (
          <Tab
            key={currItem._id}
            label={
              <Card
                sx={{
                  minWidth: 275,
                  height: 150,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 2,
                  borderColor: "transparent",
                  backgroundColor: color,
                  color: fontColor,
                  boxShadow: 3,
                }}
                variant="outlined"
                data-aos="fade-down"
                data-aos-easing="linear"
                data-aos-duration="700"
                data-aos-offset="150"
                data-aos-delay={100 * (index * 2)}
              >
                <CardContent>
                  <Typography variant="h5" component="div">
                    {currItem.categoryName}
                  </Typography>
                </CardContent>
              </Card>
            }
            onClick={() => navigate(`category/${currItem._id}`)}
          />
        ))}
      </Tabs>
    </div>
  );
};

export default CategoriesSlider;
