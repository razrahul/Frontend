import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/images/logo.png";
import { useParams } from "react-router-dom";
import { server } from '../../redux/store';
import { buySubscription } from "../../redux/actions/subscription";
import {toast} from "react-toastify";
import { addToPlaylist} from '../../redux/actions/profile'

const Subscribe = ({ user }) => {
 

  //yaha se
  const { courses } = useSelector((state) => state.course);
  // console.log(courses)

  const params = useParams()
  // console.log(params.id)

 

  const Course = courses?.find((course) => {
    return course._id === params.id;
  });

  
  
  
  // if (Course) {
  //   console.log(Course);
  //   console.log(Course.price)
  // } else {
  //   console.log('Course not found');
  // }
  
  //yaha tak

   const dispatch = useDispatch();
   const [key, setKey] = useState("");

  const { loading, error, subscriptionId } = useSelector(
    state => state.subscription );

  // const { error: courseError } = useSelector(state => state.course);

  const subscribeHandler = async () => {
    const {
      data: { key },
    } = await axios.get(`${server}/razorpaykey`);
    // setKey(data.key)
    setKey(key);
    dispatch(buySubscription(params.id));
  };
 


  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
  //   if (courseError) {
  //     toast.error(courseError);
  //     dispatch({ type: 'clearError' });
  //   }
    if (subscriptionId) {
      const openPopUp = () => {
        const options = {
          key,
          amount:Course.price,
          currency:"INR",
          name: 'E-Learning Web App',
          description: 'Get access in Course to all Mega content',
          image: logo,
          subscription_id: subscriptionId,
          callback_url: `${server}/paymentverification`,
          prefill: {
            name: user.name,
            email: user.email,
            contact: '',
          },
          notes: {
            address: 'CodeBucket Ptv Ltd.',
          },
          theme: {
            color: '#FFC800',
          },
        };

        const razor = new window.Razorpay(options);
        razor.open();
      };
      openPopUp();
    }
    // dispatch(addToPlaylist(params.id))
  }, [
    // dispatch,
    error,
    // courseError,
    user.name,
    user.email,
    key,
    subscriptionId,
  ]);

  return (
    <Container h="90vh" p="16"  mb="10">
      <Heading children="Welcome" my="8" textAlign={"center"} />

      <VStack
        boxShadow={"lg"}
        alignItems="stretch"
        borderRadius={"lg"}
        spacing="0"
      >
        <Box bg="yellow.400" p={"4"} css={{ borderRadius: "8px 8px 0 0" }}>
          <Text color={"black"} children={`Mega Pack - ₹${Course.price}.00`} />
        </Box>
        <Box p="4">
          <VStack textAlign={"center"} px="2" mt={"4"} spacing="4">
            <Text children={`Join Mega pack and get access to all lectures.`} />
            <Text as='b' size="xs"  textTransform="uppercase" children={`${Course.title}.`} />
            <Text size='lg' children={`${Course.category}.`} />
            <Heading size="md" children={`₹${Course.price} Only`} />
          </VStack>

          <Button
            my="8"
            w="full"
            colorScheme={"yellow"}
            onClick={subscribeHandler}
            isLoading={loading}
          >
            Buy Now
          </Button>
        </Box>

        <Box bg="blackAlpha.600" p="4" css={{ borderRadius: "0 0 8px 8px" }}>
          <Heading
            color={"white"}
            textTransform="uppercase"
            size="sm"
            children={"100% refund at cancellation"}
          />

          <Text
            fontSize={"xs"}
            color="white"
            children={"*Terms & Conditions Apply"}
          />
        </Box>
      </VStack>
    </Container>
  );
};

export default Subscribe;
