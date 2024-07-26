import {
  Button,
  Center,
  Container,
  Heading,
  HStack,
  Image,
  Input,
  Stack,
  Text,
  VStack,
  Box,
  Spinner,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCourseById } from "../../redux/actions/course";
import { addToPlaylist } from "../../redux/actions/profile";
import { loadUser } from "../../redux/actions/user";
import { toast } from "react-toastify";

const Course = ({
  views,
  title,
  price,
  imageSrc,
  id,
  addToPlaylistHandler,
  creator,
  description,
  lectureCount,
  loading,
}) => {
  return (
    <VStack className="course" alignItems={["center", "flex-start"]}>
      <Image src={imageSrc} boxSize="60" objectFit={"contain"} />
      <Heading
        textAlign={["center", "left"]}
        maxW="200px"
        size={"sm"}
        fontFamily={"sans-serif"}
        noOfLines={3}
        children={title}
      />
      <Text noOfLines={2} children={description} />
      
      <HStack>
        <Text fontWeight={"bold"} textTransform="uppercase" children={"Creator"} />
        <Text fontFamily={"body"} textTransform="uppercase" children={creator} />
      </HStack>

      <Heading textAlign={"center"} size="xs" children={`Lectures - ${lectureCount}`} textTransform="uppercase" />
      <Heading size="xs" children={`Views - ${views}`} textTransform="uppercase" />

      <Stack direction={["column", "row"]} alignItems="center">
        <Link to={`/course/${id}`}>
          <Button colorScheme={"yellow"}>Watch Now</Button>
        </Link>
        <Button
          isLoading={loading}
          variant={"ghost"}
          colorScheme={"yellow"}
          onClick={() => addToPlaylistHandler(id)}
        >
          Add to playlist
        </Button>
      </Stack>
      <VStack alignItems="center">
        <Box display="flex" justifyContent="center" alignItems="center" width="100%">
          <Text
            width="250px"
            fontWeight="bold"
            bgColor="yellow.500"
            fontSize="lg"
            color="black"
            p={2} 
            borderRadius="md" 
            textAlign="center"
          >
            Price - ₹ {price}
          </Text>
        </Box>
        <Link to={`/cancelsubscribe/${id}`}>
          <Button width="250px" colorScheme={"blue"}>
            Buy Now
          </Button>
        </Link>
      </VStack>
    </VStack>
  );
};

const MYCourses = ({ user }) => {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [subscribedCourses, setSubscribedCourses] = useState([]);
  const dispatch = useDispatch();

  const { loading, error, message } = useSelector((state) => state.course);

  const fetchSubscribedCourses = async () => {
    try {
      const courseIds = user.subscription.map((item) => item.course);

      const courses = await Promise.all(
        courseIds.map(async (id) => {
          try {
            const response = await dispatch(getCourseById(id));
            return response?.courses;
          } catch (error) {
            console.error(`Error fetching course with ID ${id}:`, error);
            return null;
          }
        })
      );
      // Debugging the subscribedCourses
      // console.log(courses);
      // Ensure all courses are unique
      // const uniqueCourses = Array.from(new Set(courses.map(course => course?._id)))
      //   .map(id => courses.find(course => course?._id === id));

      // setSubscribedCourses(uniqueCourses.filter(course => course !== null && course !== undefined));
      setSubscribedCourses(courses)
    } catch (error) {
      toast.error("Failed to load subscribed courses");
      console.error("Error fetching subscribed courses:", error);
    }
  };

  useEffect(() => {
    if (user && user.subscription) {
      fetchSubscribedCourses();
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    } else if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, message]);

  const addToPlaylistHandler = async (courseId) => {
    await dispatch(addToPlaylist(courseId));
    setTimeout(() => {
      dispatch(loadUser());
    }, 1400); 
  };

  const categories = [
    "Web development",
    "Artificial Intelligence",
    "Data Structure & Algorithm",
    "App Development",
    "Data Science",
    "Game Development",
  ];

  return (
    <Container minH={"95vh"} maxW="container.lg" paddingY={"8"}>
      <Heading children="My Courses" m={"8"} />

      <Input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search a course..."
        type={"text"}
        focusBorderColor="yellow.500"
      />

      <HStack
        overflowX={"auto"}
        paddingY="8"
        css={{
          "&::-webkit-scrollbar": {
            display: "scrollbar", // scrollbar/none
          },
        }}
      >
        {categories.map((item, index) => (
          <Button key={index} onClick={() => setCategory(item)} minW={"60"}>
            <Text children={item} />
          </Button>
        ))}
      </HStack>

      {loading ? (
        <Center h="50vh">
          <Spinner size="xl" />
        </Center>
      ) : (
        <Stack
          direction={["column", "row"]}
          flexWrap="wrap"
          justifyContent={["flex-start", "space-evenly"]}
          alignItems={["center", "flex-start"]}
        >
          {subscribedCourses.length > 0 ? (
            subscribedCourses.map((item) => (
              <Course
                key={item._id}
                title={item.title}
                description={item.description}
                price={item.price}
                views={item.views}
                imageSrc={item.poster.url}
                id={item._id}
                creator={item.createdBy}
                lectureCount={item.numOfVideos}
                addToPlaylistHandler={addToPlaylistHandler}
                loading={loading}
              />
            ))
          ) : (
            <Heading opacity={0.5} mt="4" children="Courses Not found" />
          )}
        </Stack>
      )}
    </Container>
  );
};

export default MYCourses;
