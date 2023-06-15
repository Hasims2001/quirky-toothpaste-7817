import {
  HStack,
  Heading,
  Box,
  Text,
  Image,
  SimpleGrid,
  GridItem,
  Container,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import Theme from "../contextProvider/Theme";
import uprightarrow from "../img/up-right-arrow.png";
import { fetchData } from "../utills/api.js";
import { useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import { reducer } from "../utills/reducer.js";
const init = {
  loading: true,
  data: [],
  error: false,
};

// const TreatmentReducer = (state, { type, payload }) => {
//   switch (type) {
//     case "LOADING":
//       return {
//         ...state,
//         loading: true,
//       };
//     case "FATCHED":
//       return {
//         ...state,
//         loading: false,
//         data: payload,
//       };
//     case "ERROR":
//       return {
//         ...state,
//         loading: false,
//         error: true,
//       };
//     default: {
//       throw new Error("Action type does not match!");
//     }
//   }
// };
function Treatment() {
  useEffect(() => {
    dispatch({ type: "LOADING" });
    fetchData()
      .then((res) => {
        dispatch({ type: "FATCHED", payload: res?.data });
      })
      .catch((err) => dispatch({ type: "ERROR", payload: err }));
  }, []);

  const [state, dispatch] = useReducer(reducer, init);
  const { loading, data, error } = state;

  if (loading) {
    return (
      <Box mt={"30px"}>
        <HStack justifyContent={"space-between"}>
          <Heading as="h3">Treatment Menu</Heading>
          <Text>
            We offer a wide range of therapies and booster <br /> suppliments
          </Text>
        </HStack>

        <SimpleGrid spacing={5} columns={3} m={"40px 0"}>
          {new Array(20).fill(0).map(() => (
            <GridItem>
              <Box
                padding="50px"
                m={"10px 0"}
                borderRadius={"md"}
                boxShadow="lg"
                bg="brand.200"
              >
                <SkeletonCircle size="10" />
                <SkeletonText
                  mt="4"
                  noOfLines={2}
                  spacing="4"
                  skeletonHeight="2"
                />
              </Box>
            </GridItem>
          ))}
        </SimpleGrid>
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        Something Went Wrong... <br /> Please Try Again...
      </Container>
    );
  }
  return (
    <Box mt={"30px"}>
      <HStack justifyContent={"space-between"}>
        <Heading as="h3">Treatment Menu</Heading>
        <Text>
          We offer a wide range of therapies and booster <br /> suppliments
        </Text>
      </HStack>
      {/* <HStack></HStack> */}
      <SimpleGrid spacing={5} columns={3} m={"40px 0"}>
        {data.map(({ id, name, price }) => (
          <GridItem
            key={id}
            backgroundColor={"brand.200"}
            borderRadius={"md"}
            boxShadow="lg"
            p={"50px"}
          >
            {/* <Box id={`firstlook${id}`}> */}
            <Link to={`/SingleTreatment/${id}`}>
              <Text fontSize={"lg"} m={"10px 0"}>
                {name}
              </Text>
              <HStack justifyContent={"space-between"}>
                <Text>
                  $ <span style={{ fontSize: "25px" }}>{price}</span>
                </Text>

                <Box
                  border={"1px solid"}
                  borderColor={"brand.100"}
                  borderRadius={"md"}
                  p={"15px"}
                  _hover={{ borderColor: "brand.400", cursor: "pointer" }}
                >
                  <Image src={uprightarrow} w={"10px"} alt="uprightarrow" />
                </Box>
              </HStack>
            </Link>
            {/* </Box> */}
            {/* <Box
              id={`secondlook${id}`}
              style={{
                display: "none",
                overflowY: "scroll",
                height: "100%",
              }}
            >
              <Text>{description[0].title}</Text>
              <br />
              <Text>{description[0].content}</Text>
            </Box> */}
          </GridItem>
        ))}
      </SimpleGrid>
    </Box>
  );
}
export default Treatment;