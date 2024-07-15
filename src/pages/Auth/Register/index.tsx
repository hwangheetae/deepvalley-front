// import { useState } from 'react';
// import { redirect } from 'react-router-dom';

// import { Formik, Field } from 'formik';
// import CustomButton from '../../../components/Common/CustomButton';
// import Layout from '../../../components/Common/Layout';
// import Logo from '../../../assets/images/Logo.png';
// import { buttonStyle } from '../../../styles/customChakraPropsStyle';
// import {
//   Flex,
//   FormControl,
//   FormErrorMessage,
//   VStack,
//   Input,
//   Image,
//   Link,
//   Text,
// } from '@chakra-ui/react';
// import { Register } from '../../../api/Auth/AuthService';

// const Register = () => {
//   const [error, setError] = useState<string | null>(null);

//   const handleSubmit = async (values: { email: string; password: string }) => {
//     try {
//       await register(values.email, values.password);
//       redirect('/');
//     } catch (err) {
//       setError('잘못된 이메일 또는 비밀번호 입니다.');
//     }
//   };
//   return (
//     <Layout>
//       <Flex
//         direction="column"
//         bg="white"
//         align="center"
//         justify="center"
//         h="100vh"
//         p={4}
//       >
//         <Image
//           boxSize="150px"
//           objectFit="contain"
//           src={Logo}
//           alt="Logo"
//           mb={4}
//         />
//         <Text
//           fontSize="2xl"
//           fontWeight="bold"
//           mb={8}
//           fontFamily="Cafe24Ssurround"
//         >
//           깊은산골짜기
//         </Text>

//         <Formik
//           initialValues={{
//             email: '',
//             password: '',
//             // rememberMe: false,
//           }}
//           onSubmit={handleSubmit}
//         >
//           {({ handleSubmit, errors, touched }) => (
//             <form
//               onSubmit={handleSubmit}
//               style={{ width: '70%', maxWidth: '400px' }}
//             >
//               <VStack spacing={4} w="full">
//                 <FormControl isInvalid={!!errors.email && touched.email}>
//                   <Field
//                     as={Input}
//                     id="email"
//                     name="email"
//                     type="email"
//                     variant="outline"
//                     placeholder="이메일"
//                     borderRadius="full"
//                     validate={(value: string) => {
//                       let error;
//                       if (!value) {
//                         error = '이메일을 입력해주세요';
//                       }
//                       return error;
//                     }}
//                   />
//                   <FormErrorMessage>{errors.email}</FormErrorMessage>
//                 </FormControl>

//                 <FormControl isInvalid={!!errors.password && touched.password}>
//                   <Field
//                     as={Input}
//                     id="password"
//                     name="password"
//                     type="password"
//                     variant="outline"
//                     placeholder="비밀번호"
//                     borderRadius="full"
//                     validate={(value: string) => {
//                       let error;
//                       if (!value) {
//                         error = '비밀번호를 입력해주세요';
//                       }
//                       return error;
//                     }}
//                   />
//                   <FormErrorMessage>{errors.password}</FormErrorMessage>
//                   <Flex justify="flex-end" w="full">
//                     <Link href="#" color="teal.500" fontSize="sm" p={2}>
//                       비밀번호를 잊으셨나요?
//                     </Link>
//                   </Flex>
//                 </FormControl>

//                 <CustomButton
//                   type="submit"
//                   width="full"
//                   borderRadius="full"
//                   ButtonStyle={buttonStyle}
//                 >
//                   로그인
//                 </CustomButton>

//                 <CustomButton
//                   type="button"
//                   width="full"
//                   borderRadius="full"
//                   ButtonStyle={{
//                     ...buttonStyle,
//                     backgroundColor: '#fee500',
//                     color: 'black',
//                   }}
//                 >
//                   <Flex align="center">
//                     <Image
//                       src="/path/to/kakao_icon.png"
//                       alt="KakaoTalk Icon"
//                       boxSize="20px"
//                       mr={2}
//                     />
//                     카카오로 로그인
//                   </Flex>
//                 </CustomButton>

//                 <Flex w="full" justify="center">
//                   <Text fontSize="sm">계정이 없으신가요?</Text>
//                   <Link href="#" color="teal.500" ml={1} fontSize="sm">
//                     회원가입
//                   </Link>
//                 </Flex>
//               </VStack>
//             </form>
//           )}
//         </Formik>
//       </Flex>
//     </Layout>
//   );
// };

// export default Register;
