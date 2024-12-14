import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';

import Welcome from './welcome'; // Assuming you have a Welcome.tsx file
import Closet from './closet';   // Assuming you have a Closet.tsx file
import Recommendations from './recommendations'; // Assuming you have a Recommendations.tsx file

const NavBar = () => {
  const [activeTab, setActiveTab] = useState('home');
  const colorScheme = useColorScheme();

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Welcome />;
      case 'closet':
        return <Closet />;
      case 'recommendations':
        return <Recommendations />;
      default:
        return <Welcome />;
    }
  };

  return (
    <View style={styles.wrapper}>
      {/* Page content */}
      <View style={styles.content}>{renderContent()}</View>

      {/* Fixed navbar at the bottom */}
      <View style={styles.navbar}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => setActiveTab('home')}
        >
          <TabBarIcon
            name="home-outline"
            color={activeTab === 'home' ? 'white' : '#999'}
          />
          {/* <Text
            style={[
              styles.navText,
              { color: activeTab === 'home' ? 'white' : '#999' },
            ]}
          >
            Home
          </Text> */}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => setActiveTab('closet')}
        >
          <TabBarIcon
            name="shirt-outline"
            color={activeTab === 'closet' ? 'white' : '#999'}
          />
          {/* <Text
            style={[
              styles.navText,
              { color: activeTab === 'closet' ? 'white' : '#999' },
            ]}
          >
            Closet
          </Text> */}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => setActiveTab('recommendations')}
        >
          <TabBarIcon
            name="sparkles-outline"
            color={activeTab === 'recommendations' ? 'white' : '#999'}
          />
          {/* <Text
            style={[
              styles.navText,
              { color: activeTab === 'recommendations' ? 'white' : '#999' },
            ]}
          >
            Recommendations
          </Text> */}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1, 
    backgroundColor: '#0c0b32', 
  },
  content: {
    flex: 1,
  },
  navbar: {
    position: 'absolute',
    bottom: 25,
    left: 0,
    right: 0,
    flexDirection: 'row',
    // justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'transparent', // Transparent background for the navbar
    paddingVertical: 10,
    zIndex: 1000, // Ensure navbar stays on top
    justifyContent: "center",
    columnGap: 50,
  },
  navButton: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default NavBar;
