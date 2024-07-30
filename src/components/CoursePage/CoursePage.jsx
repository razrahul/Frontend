import { Box, Center, Grid, Heading, Text, VStack, Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { getCourseLectures } from '../../redux/actions/course';
import Loader from '../Layout/Loader/Loader';
import introVideo from '../../assets/videos/intro.mp4';


const CoursePage = ({ user }) => {
  // dayanimics
  
  // const lectures =[
  //   {
  //     _id: 'ncndnd',
  //   title: 'sample',
  //   description: 'sample sdcdal ciali ieodjail kjwca',
  //   video: {
  //     url: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  //   }
  //   },
  //   {
  //     _id: 'ncndnd',
  //   title: 'sample',
  //   description: 'sample sdcdal ciali ieodjail kjwca',
  //   video: {
  //     url: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  //   }
  //   },
  //   {
  //     _id: 'ncndnd',
  //   title: 'sample',
  //   description: 'sample sdcdal ciali ieodjail kjwca',
  //   video: {
  //     url: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  //   }
  //   }
  // ]

  const [lectureNumber, setLectureNumber] = useState(0);

  const { lectures, loading } = useSelector(state => state.course);


  const dispatch = useDispatch();
  const params = useParams();
  console.log(params.id)

  useEffect(() => {
    dispatch(getCourseLectures(params.id));
  }, [dispatch, params.id]);

  // if (
  //   user.role !== 'admin' &&
  //   (user.subscription === undefined || user.subscription.status !== 'active')
  // ) {
  //   return <Navigate to={'/subscribe'} />;
  // }

  return loading ? (
    <Loader />
  ) : (
    <Grid mt={8} minH={'90vh'} templateColumns={['1fr', '3fr 1fr']}>
      {lectures && lectures.length > 0 ? (
        <>
          <Box pl={20} pt={8} >
            <video
              width={'85%'}
              controls
              controlsList="nodownload noremoteplayback"
              disablePictureInPicture
              disableRemotePlayback
              src={lectures[lectureNumber].video.url}
              style={{
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              }}
            ></video>

            <Heading
              m="4"
              children={`#${lectureNumber + 1} ${
                lectures[lectureNumber].title
              }`}
            />

            <Heading m="4" children="Description" />
            <Text m="4" children={lectures[lectureNumber].description} />
          </Box>

          <VStack>
            {lectures.map((element, index) => (
              <button
                onClick={() => setLectureNumber(index)}
                key={element._id}
                style={{
                  width: '100%',
                  padding: '1rem',
                  textAlign: 'center',
                  margin: 0,
                  borderBottom: '1px solid rgba(0,0,0,0.2)',
                }}
              >
                <Text noOfLines={1}>
                  #{index + 1} {element.title}
                </Text>
              </button>
            ))}
          </VStack>
        </>
      ) : (
        <Flex justifyContent="center" alignItems="center" height="100vh">
          <Heading  children="!No Lectures 
            :-> Available Soon" />
        </Flex>
      )}
    </Grid>
  );
};

export default CoursePage;
