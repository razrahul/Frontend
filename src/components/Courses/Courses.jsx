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
import { getAllCourses } from "../../redux/actions/course";
import { toast } from "react-toastify";
import { addToPlaylist } from "../../redux/actions/profile";
import { loadUser } from "../../redux/actions/user";
import useDebounce from "../Hook/useDebounce";

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
}) => (
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
      maxW="220px"
      size="sm"
      fontFamily="sans-serif"
      noOfLines={3}
    >
      {title}
    </Heading>
    <Text noOfLines={2}>{description}</Text>
    <HStack spacing={1}>
      <Text fontWeight="bold" textTransform="uppercase">
        Creator
      </Text>
      <Text fontFamily="body" textTransform="uppercase">
        {creator}
      </Text>
    </HStack>
    <Heading textAlign="center" size="xs" textTransform="uppercase">
      Lectures - {lectureCount}
    </Heading>
    <Heading size="xs" textTransform="uppercase">
      Views - {views}
    </Heading>
    <Stack direction={["column", "row"]} spacing={4} alignItems="center">
      <Link to={`/course/${id}`}>
        <Button colorScheme="yellow">Watch Now</Button>
      </Link>
      <Button
        isLoading={loading}
        variant="ghost"
        colorScheme="yellow"
        onClick={() => addToPlaylistHandler(id)}
      >
        Add to playlist
      </Button>
    </Stack>
    <VStack alignItems="center" spacing={4}>
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
      <Link to={`/subscribe/${id}`}>
        <Button width="250px" colorScheme="blue">
          Buy Now
        </Button>
      </Link>
    </VStack>
  </VStack>
);

const Courses = () => {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("All");

  const debouncedKeyword = useDebounce(keyword, 500);
  const debouncedCategory = useDebounce(category, 500);

  const dispatch = useDispatch();
  const { loading, courses, error, message } = useSelector(
    (state) => state.course
  );

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

  useEffect(() => {
    dispatch(
      getAllCourses(
        debouncedCategory === "All" ? "" : debouncedCategory,
        debouncedKeyword
      )
    );
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    } else if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [debouncedCategory, debouncedKeyword, dispatch, error, message]);

  return (
    <Container minH={"95vh"} maxW="container.lg" paddingY={"8"}>
      <Heading m={"8"}>All Courses</Heading>

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
            display: "scrollbar",
          },
        }}
      >
        {categories.map((item, index) => (
          <Button key={index} onClick={() => setCategory(item)} minW={"60"}>
            <Text>{item}</Text>
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
          {courses.length > 0 ? (
            courses.map((item) => (
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
            <Heading opacity={0.5} mt="4">
              Courses Not found
            </Heading>
          )}
        </Stack>
      )}
    </Container>
  );
};

export default Courses;
