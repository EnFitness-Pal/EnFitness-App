import { Animated, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { colors, heightScreen, widthScreen } from '../../utility'
import CalendarStrip from 'react-native-calendar-strip';
import { Calendar } from 'react-native-calendars';
import Ionicons from 'react-native-vector-icons/Ionicons';

const InsigntScreen = () => {
  const [date, setDate] = useState(new Date())
  const [showCalendar, setShowCalendar] = useState(false);
  const onHeaderSelected = (date) => {
    console.log(date);
    setShowCalendar(true);
  };
  const onDayPress = (day) => {
    console.log('day',day);
    setDate(day.dateString);
    setShowCalendar(false);
  };
  console.log(date);
  return (
    <View style={styles.container}>
      <CalendarStrip
        scrollable
        style={{ height: heightScreen * 0.22, width: widthScreen, backgroundColor: colors.GRAYDARK}}
        calendarColor={'transparent'}
        onHeaderSelected={onHeaderSelected}
        calendarHeaderStyle={{ color: 'white', fontSize: 17, fontWeight: 'bold', backgroundColor: 'transparent', marginTop: heightScreen * 0.055, marginBottom: heightScreen * 0.04 }}
        calendarHeaderFormat='MMM YYYY'
        dateNumberStyle={{ color: colors.GRAYLIGHT, fontSize: 17 }}
        dateNameStyle={{ color: colors.GRAYLIGHT, fontSize: 13, marginVertical: 5, fontWeight: 'bold' }}
        highlightDateContainerStyle={{ backgroundColor: colors.MAIN }}
        dayContainerStyle={{ backgroundColor: colors.BACK, borderRadius: 20, height: 65, width: 40}}
        onDateSelected={(date) => setDate(date)}
        selectedDate={date}
        // onWeekChanged={(date) => console.log(date)}
        minDate={'2023-01-01'}
        maxDate={'2023-12-31'}
        daySelectionAnimation={{ type: 'background', duration: 30, highlightColor: colors.MAIN }}
        highlightDateNumberStyle={{ color: colors.WHITE, fontSize: 17 }}
        highlightDateNameStyle={{ color: colors.WHITE, fontWeight: 'bold', fontSize: 13 }}
        iconStyle={{ tintColor: 'transparent' }}
      />
      <Modal visible={showCalendar} animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <Calendar
            onDayPress={onDayPress}
            style={{
              width: widthScreen - 40,
              height: heightScreen * 0.42,
              backgroundColor: colors.BG,
              shadowColor: colors.WHITE,
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,

              
            }}
            theme={{
              arrowColor: colors.MAIN,
              calendarBackground: colors.BG,
              selectedDayBackgroundColor: colors.MAIN,
              selectedDayTextColor: colors.WHITE,
              todayTextColor: colors.MAIN,
              dayTextColor: colors.WHITE,
              textDisabledColor: colors.GRAYLIGHT,
              textDayFontWeight: 'bold',
            }}

            
          />
          <TouchableOpacity onPress={() => setShowCalendar(false)} style={styles.containerButton}>
            <Ionicons
              name =  "close-circle-sharp"
              style={styles.modalCloseButton}
              size= {20}
            />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  )
}

export default InsigntScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BG,
  },
  modalContainer: {
    position: 'absolute',
    backgroundColor: "transparent",
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  modalCloseButton: {
    fontWeight: 'bold',
    color: colors.MAIN,
  },
  containerButton: {
    alignItems: 'center',
    // marginBottom: 10,
    zIndex: 1,

  }
})