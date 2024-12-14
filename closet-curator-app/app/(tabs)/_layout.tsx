import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { supabase } from '@/supabase'; // Adjust the import to your Supabase client location
import { useColorScheme } from '@/hooks/useColorScheme';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import Welcome from './welcome'; 
import Closet from './closet';  
import Recommendations from './recommendations'; 
import Login from './login';
import Signup from './signup';

const NavBar = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [signedIn, setSignedIn] = useState(false);
  const colorScheme = useColorScheme();

  // Check the user's signed-in status on component mount
  useEffect(() => {
    // Check if a session exists using Supabase
    const session = supabase.auth.getSession();
    setSignedIn(!!session); // If there's a session, the user is signed in

    // Listen for authentication state changes (login/logout)
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setSignedIn(!!session); // Update signedIn state based on session
    });

    // Clean up listener on unmount
    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Welcome setActiveTab={setActiveTab} />;
      case 'login':
        return <Login />;
      case 'signup':
        return <Signup />;
      case 'closet':
        return <Closet />;
      case 'recommendations':
        return <Recommendations />;
      default:
        return <Welcome setActiveTab={setActiveTab} />;
    }
  };

  // Render the navbar only if the user is signed in
  return (
    <View style={styles.wrapper}>
      {/* Page content */}
      <View style={styles.content}>{renderContent()}</View>

      {/* Show navbar only if signedIn is true */}
      <View style={styles.navbar}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => setActiveTab('home')}
        >
          <TabBarIcon
            name="home-outline"
            color={activeTab === 'home' ? 'white' : '#999'}
          />
        </TouchableOpacity>

        {/* Only show 'closet' and 'recommendations' buttons if signedIn is true */}
        {signedIn && (
          <>
            <TouchableOpacity
              style={styles.navButton}
              onPress={() => setActiveTab('closet')}
            >
              <TabBarIcon
                name="shirt-outline"
                color={activeTab === 'closet' ? 'white' : '#999'}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navButton}
              onPress={() => setActiveTab('recommendations')}
            >
              <TabBarIcon
                name="sparkles-outline"
                color={activeTab === 'recommendations' ? 'white' : '#999'}
              />
            </TouchableOpacity>
          </>
        )}
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
    bottom: 30,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingVertical: 10,
    zIndex: 1000, // Ensure navbar stays on top
    justifyContent: 'center',
    columnGap: 80,
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
