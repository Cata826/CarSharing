import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    HStack,
    IconButton,
    Input,
    SkeletonText,
    Text,
    Spinner,
  } from '@chakra-ui/react'
  import { FaLocationArrow, FaTimes ,FaCalendar,FaClock,FaUser,FaPlus,FaMinus,FaCar,FaList } from 'react-icons/fa'
  import DatePicker from 'react-datepicker'; // Import DatePicker from react-datepicker
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-datepicker/dist/react-datepicker.css'; // Import the styles for react-datepicker
import { useNavigate  } from 'react-router-dom';
// GoogleApp.js
import PropTypes from 'prop-types';

  import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    Autocomplete,
    DirectionsRenderer,
  } from '@react-google-maps/api'
  
  import { useRef, useState } from 'react'
  import { Link } from 'react-router-dom';
  import './Calendar.css'; 
  import Calendar from './Calendar'; 
  import RideList from './Ride';
  const center = { lat: 46.77136993408203, lng: 23.586137771606445 }

GoogleApp.propTypes = {
  userId: PropTypes.string, 
};

  function GoogleApp({userId }) { 
    const { isLoaded } = useJsApiLoader({
      googleMapsApiKey:'**********************8',
      libraries: ['places'],
    })
   
    console.log(userId);
    const [map, setMap] = useState(/** @type google.maps.Map */ (null))
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')
    const [data, setData] = useState('')
    // const [showCalendar, setShowCalendar] = useState(false);
    const [showRide,setRides]=useState(false);
  const [numberOfPersons, setNumberOfPersons] = useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [minDate, setMinDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('12:00');
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [minTime, setMinTime] = useState(new Date());
  const [loading,setLoading]=useState();
  const navigate = useNavigate();
 
  const incrementPersons = () => {
    if (numberOfPersons < 9) {
      setNumberOfPersons((prev) => prev + 1);
    }
  };
  const startLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/MainApp'); 
    }, 5000); 
  };
  const decrementPersons = () => {
    if (numberOfPersons > 1) {
      setNumberOfPersons((prev) => prev - 1);
    }
  };

    const toggleRide = () => {
      setRides(!showRide);
    };
    /** @type React.MutableRefObject<HTMLInputElement> */
    const originRef = useRef()
    /** @type React.MutableRefObject<HTMLInputElement> */
    const destiantionRef = useRef()
  
    if (!isLoaded) {
      return <SkeletonText />
    }
    async function calculateRoute() {
      if (originRef.current.value === '' || destiantionRef.current.value === '') {
        return
      }
      // eslint-disable-next-line no-undef
      const directionsService = new google.maps.DirectionsService()
      const results = await directionsService.route({
        origin: originRef.current.value,
        destination: destiantionRef.current.value,
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING,
      })
      setDirectionsResponse(results);
      setDistance(results.routes[0].legs[0].distance.text);
      setDuration(results.routes[0].legs[0].duration.text);
    
      const data = {
        origin: originRef.current.value,
        destination: destiantionRef.current.value,
        distance: results.routes[0].legs[0].distance.text,
        time: results.routes[0].legs[0].duration.text,
      };
    }
    async function calculateRoute1() {
      if (originRef.current.value === '' || destiantionRef.current.value === '') {
        return
      }
      // eslint-disable-next-line no-undef
      const directionsService = new google.maps.DirectionsService()
      const results = await directionsService.route({
        origin: originRef.current.value,
        destination: destiantionRef.current.value,
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING,
      })
      setDirectionsResponse(results);
      setDistance(results.routes[0].legs[0].distance.text);
      setDuration(results.routes[0].legs[0].duration.text);
    
      const data = {
        user_id:userId,
        origin: originRef.current.value,
        destination: destiantionRef.current.value,
        distance: results.routes[0].legs[0].distance.text,
        time: results.routes[0].legs[0].duration.text,
        data: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()+1).toISOString().split('T')[0],
        number_seats: numberOfPersons,
      };

      console.log('Data:', data);
      startLoading();
      fetch('http://localhost:8080/api/v1/registration/createride', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then((response) => {
        console.log('Response:', response);
        //return response.json();
      })
      
        .then((data) => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  
    function clearRoute() {
      setDirectionsResponse(null)
      setDistance('')
      setDuration('')
      originRef.current.value = ''
      destiantionRef.current.value = ''
    }

    return (
      <Flex
        position='relative'
        flexDirection='column'
        alignItems='center'
        h='100vh'
        w='100vw'
      >
        <Box position='absolute' left={0} top={0} h='100%' w='100%'>
    
          <GoogleMap
            center={center}
            zoom={15}
            mapContainerStyle={{ width: '100%', height: '100%' }}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
            onLoad={map => setMap(map)}
          >
            <Marker position={center} />
            {directionsResponse && (
              <DirectionsRenderer directions={directionsResponse} />
            )}
          </GoogleMap>
        </Box>
        <Box
          p={4}
          borderRadius='lg'
          m={4}
          bgColor='white'
          shadow='base'
          minW='container.md'
          zIndex='1'
        >
          <HStack spacing={2} justifyContent='space-between'>
            <Box flexGrow={1}>
              <Autocomplete>
                <Input type='text' placeholder='Origin' ref={originRef} />
              </Autocomplete>
            </Box>
            <Box flexGrow={1}>
              <Autocomplete>
                <Input
                  type='text'
                  placeholder='Destination'
                  ref={destiantionRef}
                />
              </Autocomplete>
            </Box>
  
            <ButtonGroup>
              <Button colorScheme='blue' type='submit' onClick={calculateRoute}>
                Calculate Route
              </Button>
              <IconButton
                aria-label='center back'
                icon={<FaTimes />}
                onClick={clearRoute}
              />
            </ButtonGroup>
          </HStack>
          <HStack spacing={4} mt={4} justifyContent='space-between'>
            <Text>Distance: {distance} </Text>
            <Text>Duration: {duration} </Text>
            <IconButton
              aria-label='center back'
              icon={<FaLocationArrow />}
              isRound
              onClick={() => {
                map.panTo(center)
                map.setZoom(15)
              }}
            />
          </HStack>
          <HStack spacing={4} mt={4} justifyContent='center' alignItems='center'>
  {/* Use the toggleCalendar function to toggle the visibility of the calendar */}
  {/* <IconButton
  aria-label='go to time picker'
  icon={<FaClock />}
  onClick={() => setShowTimePicker(!showTimePicker)}
/> */}

  <IconButton
    aria-label='go to calendar'
    icon={<FaCalendar />}
    onClick={() => setShowDatePicker(!showDatePicker)}
  />
 
  <HStack alignItems='center'>
  <Box>
    <IconButton
      aria-label='person icon'
      icon={<FaUser />}
      isRound
    />
  </Box>
    <IconButton
      aria-label='decrement persons'
      icon={<FaMinus />}
      isRound
      onClick={decrementPersons}
    />
    <Input
      type='number'
      value={numberOfPersons}
      onChange={(e) => setNumberOfPersons(e.target.value)}
      placeholder='1-9'
      min='1'
      max='9'
      w='50px' 
      textAlign='center' 
    />
    <IconButton
      aria-label='increment persons'
      icon={<FaPlus />}
      isRound
      onClick={incrementPersons}
    />
    <IconButton
    aria-label='car icon'
    icon={<FaCar />}
    isRound
    onClick={calculateRoute1}
  
    />
   
  </HStack>
 
  </HStack>

  <Box
      //  p={160}
        borderRadius='lg'
        m={4}
        bgColor='white'
        shadow='base'
        minW='container.md'
        zIndex='1'
      >
  
         {showDatePicker && (
        <DatePicker
          selected={selectedDate}
          onChange={(date) => {
            date.setDate(date.getDate());
            setSelectedDate(date);
            setShowDatePicker(false);
          }}
          dateFormat="yyyy-MM-dd"
          minDate={minDate}
        />
      )}
    {showTimePicker && (
          <TimePicker
          value={selectedTime}
          onChange={(time) => {
          setSelectedTime(time);
          setShowTimePicker(false);
     }}
      timeFormat="hh:mm:ss"
      minTime={minTime}
  />
  )}
      {loading && (
        <Box
          position="fixed"
          top="0"
          left="0"
          width="100%"
          height="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          backgroundColor="rgba(255, 255, 255, 0.8)"
        >
         
          Processing data
          <Spinner size="xl" color="blue.500" />
        </Box>
      )}

      </Box>
     
        </Box>
        
      </Flex>
    )
  }
  
  export default GoogleApp
