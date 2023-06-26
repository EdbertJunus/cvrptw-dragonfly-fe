export const home_data = [
  {
    text: "In Home Page, as you can see there is two sections, which is Store List and Vehicle Information.",
    image: "/images/home_1.png",
    alt: "home",
    highlight: ["Store List", "Vehicle Information"],
  },
  {
    text: "In Store List, you can Add, Update and Delete store inside the list. Each store contain information such as names, location (link, longitude, latitude), open and close time.",
    image: "/images/home_2.png",
    alt: "home_2",
    highlight: ["Add", "Update", "Delete"],
  },
  {
    text: "For Add and Update stores, there will be a modal when you click the Add or Update button. You need to fill the store information and follow the needed format. After you finished fill or change the information, you then can click Submit.",
    image: "/images/home_3.png",
    alt: "home_3",
    highlight: ["Add", "Update"],
  },
  {
    text: "For Delete stores, there will be confirmation form before deletion, if you sure you can click yes, if not you can click no.",
    image: "/images/home_4.png",
    alt: "home_4",
    highlight: ["Delete"],
  },
  {
    text: "Next Vehicle Info, you can change information about vehicle capacity and speed. Edit button can be toggle to change vehicle information.",
    image: "/images/home_5.png",
    alt: "home_5",
    highlight: [""],
  },
  {
    text: "Vehicle Information can only be edited if the edit button is clicked, and after you filled the data. You can save the vehicle information.",
    image: "/images/home_6.png",
    alt: "home_6",
    highlight: [""],
  },
  {
    text: "Store List and Vehicle Information is needed in order to make Route Calculation",
    image: "",
    alt: "",
    highlight: ["Route Calculation"],
  },
];

export const route_calc_data = [
  {
    text: "In Route Calculation Form, the first information needed to be filled is the Number of Stores to visit.",
    image: "/images/route.png",
    alt: "route",
    highlight: ["Number of Stores to visit"],
  },
  {
    text: "If there is not enough stores, the page will ask to add more stores.",
    image: "/images/route_2.png",
    alt: "route_2",
    highlight: [""],
  },
  {
    text: "After you add enough stores, you can then choose how many stores you want to insert into the route calculation.",
    image: "/images/route_3.png",
    alt: "route_3",
    highlight: [""],
  },
  {
    text: "Each store can only be chosen once and then insert new store demand. If demand exceed capacity, error will be shown.",
    image: "/images/route_4.png",
    alt: "route_4",
    highlight: ["demand exceed capacity"],
  },
  {
    text: "After you fill the information correctly, it will save the data and then calculate the route. This may takes sometimes, after it is done it will shown success message below the table.",
    image: "/images/route_5.png",
    alt: "route_5",
    highlight: [""],
  },
  {
    text: "After the calculation is successful, the page will refresh and go to the result page. It will then show the result like the below page",
    image: "/images/route_6.png",
    alt: "route_6",
    highlight: [""],
  },
];

export const comparison_res_data = [
  {
    text: "If you have finished doing route calculation, you then can see Model Result Comparison between Dragonflya and PSO method. It will always keep the last route calculation data.",
    image: "/images/compare_1.png",
    alt: "compare_1",
    highlight: ["Model Result Comparison"],
  },
  {
    text: "If you have not ever done any route calculation, then it will show there is not yet any route calculation done.",
    image: "/images/compare_2.png",
    alt: "compare_2",
    highlight: ["not ever done any route calculation"],
  },
];
