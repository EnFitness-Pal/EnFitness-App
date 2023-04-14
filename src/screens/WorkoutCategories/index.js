import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { colors, heightScreen, widthScreen } from '../../utility'
import { SearchBar } from '@rneui/base';
import IconBottom from '../../assets/fonts';
import ButtonBack from '../../components/ButtonBack';

const WorkoutCategories = ({navigation}) => {
  const [search, setSearch] = useState("");
  const updateSearch = (search) => {
        setSearch(search);
  };
  return (
    <SafeAreaView style = {styles.container}>
    <View style = {styles.containerHeader}>
        <ButtonBack
            name='chevron-back'
            size={28}
            onPress={() => navigation.goBack()}
        />
    </View>
    <View style = {styles.containerSearch}>
    <SearchBar
              placeholder="Search your workout..."
              onChangeText={updateSearch}
              value={search}
              platform="ios"
              containerStyle={{
                  backgroundColor: colors.BG,
                  borderTopWidth: 0,
                  borderBottomWidth: 0,
                  height: heightScreen * 0.08,
        
              }}
              inputContainerStyle={{
                  backgroundColor: colors.WHITE,
                  height: heightScreen * 0.06,
                  borderRadius: 20,
              }}
              inputStyle={{
                  fontSize: 16,
                  color: colors.BG,
              }}
              searchIcon={() => {
                  return (
                      <IconBottom
                          name='search'
                          size={28}
                          color={colors.MAIN}
                      />
                  )
              }}
    />
    </View>
    </SafeAreaView>
  )
}

export default WorkoutCategories

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BG,
    },
    containerSearch: {
        marginTop: heightScreen * 0.02,
        marginHorizontal: widthScreen * 0.03,
    },
    containerHeader: {
        flexDirection: 'row',
        marginHorizontal: widthScreen * 0.05,
    }
})