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
    <VStack
    className="course"
    alignItems={["center", "flex-start"]}
    spacing={4}
    p={4}
    // borderWidth="1px"
    // borderRadius="md"
    // boxShadow="md"
    width={["full", "300px"]}
  >
    <Image
      src={imageSrc}
      alt={title}
      width="100%" 
      height="220px" 
      objectFit="cover" 
      borderRadius="md" 
    />
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
      <VStack pt={5} alignItems="center">
        <Link to={`/cancelsubscribe/${id}`}>
          <Button width="250px" colorScheme={"red"}>
           Cancel Subscription
          </Button>
        </Link>
      </VStack>
    </VStack>
  );
};

const MYCourses = ({ user }) => {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("All");
  const [subscribedCourses, setSubscribedCourses] = useState([]);
  const dispatch = useDispatch();

  const { loading, error, message } = useSelector((state) => state.course);

  const fetchSubscribedCourses = async () => {
    try {
      const activeSubscriptions = user.subscription.filter(item => item.status === "active");
      const courseIds = activeSubscriptions.map(item => item.course);

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

      // Remove duplicates and null values
      const uniqueCourses = Array.from(new Set(courses.filter(course => course !== null && course !== undefined)));

      setSubscribedCourses(uniqueCourses);
    } catch (error) {
      toast.error("Failed to load subscribed courses");
      console.error("Error fetching subscribed courses:", error);
    }
  };

  useEffect(() => {
    if (user && user?.subscription) {
      fetchSubscribedCourses();
    }
  }, [user, user?.subscription]);

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
    "All",
    "Web development",
    "Artificial Intelligence",
    "Data Structure & Algorithm",
    "App Development",
    "Data Science",
    "Game Development",
  ];

  // Filter courses based on keyword and category
  const filteredCourses = subscribedCourses.filter(course => {
    const matchesKeyword = keyword === "" || course.title.toLowerCase().includes(keyword.toLowerCase());
    const matchesCategory = category === "All" || course.category === category;
    return matchesKeyword && matchesCategory;
  });

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
          {filteredCourses.length > 0 ? (
            filteredCourses.map((item) => (
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
