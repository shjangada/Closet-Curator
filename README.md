# Closet Curator - Fashion App Proposal

**Authors:** Shreya Jangada, Dhanish Natarajan, Seher Bhaskar, Shankar Sathyanarayanan

## Introduction
Closet Curator is an innovative fashion app designed to help users effortlessly create stylish outfits from their existing wardrobe. The app provides personalized outfit recommendations based on user preferences, occasions, and even weather conditions. It solves the common problem of having a full closet but feeling like there’s nothing to wear by intelligently matching clothing items and offering fresh combinations.

## Problem Statement
Many individuals struggle with choosing outfits that align with their personal style, fit the occasion, and match the weather. This often results in people wearing the same combinations over and over, despite owning a variety of clothes. Closet Curator addresses this by offering creative outfit suggestions tailored to the user’s wardrobe and preferences.
## Group Members
Seher Bhaskar - Backend Developer, Shreya Jangada & Dhanish Natarajan - Frontend Developers, Shankar Sathyanarayanan- ML/Reccomendation Engine Developer.
## Key Features
1. **Wardrobe Upload**: Users can upload images of their clothing by taking pictures with their phone. These images are stored in a personal wardrobe database.
2. **Personalized Outfit Suggestions**: The app suggests outfits based on user preferences like “casual,” “formal,” or “trendy” and displays these suggestions through an easy-to-use interface.
3. **Weather and Event-Based Recommendations**: In future updates, Closet Curator will provide suggestions based on local weather conditions or specific events (meetings, parties, etc.).
4. **Laundry Filter**: Users can mark clothing items as “in the laundry,” making them temporarily unavailable for outfit recommendations.

## Core Functionalities

### 1. User Authentication
- Users can create an account and log in to securely store their wardrobe information and preferences. Each user’s data is private, utilizing row-level security to ensure isolation of accounts.

### 2. Wardrobe Management
- Users upload images of their clothing using their phone camera. These images are stored in the app’s database, and the wardrobe can be managed (viewed, deleted, or updated) within the app.

### 3. Outfit Suggestions
- Based on uploaded wardrobe items, the app recommends complete outfits. Users can choose from different styles (e.g., casual, formal) to guide the recommendations.
- The app utilizes a recommendation engine that analyzes clothing combinations using machine learning and pattern recognition.

### 4. Machine Learning Recommendation Engine
- Closet Curator employs a recommendation engine built using the **DeepFashion dataset**, a pre-trained model for recognizing and categorizing clothing items.
- The system uses **Convolutional Neural Networks (CNNs)** to match the user’s wardrobe items with fashion trends and generate outfit recommendations.

## Architecture Overview

### 1. Frontend
- Developed using **React** (JavaScript) with **SASS/SCSS** for styling.
- The frontend allows users to interact with the app, upload wardrobe images, and receive outfit suggestions.
- The app’s UI is intuitive, allowing users to easily manage their wardrobe and request outfit recommendations with a button click.

### 2. Backend
- Built using **Python** and the **Django** framework, the backend handles image uploads, user authentication, and communication with the recommendation engine.
- It stores wardrobe data in a PostgreSQL database via **Supabase**. Supabase is chosen for its real-time support and OAuth integration.

### 3. Database
- **Supabase** (based on PostgreSQL) stores the images and metadata related to each user’s wardrobe.
- The database is structured to ensure that each user’s wardrobe is securely stored and accessible only by them.

### 4. Recommendation Engine
- The recommendation engine, built using **CNN clustering**, identifies matching items from the user’s wardrobe by comparing them with pre-existing fashion trends in the DeepFashion dataset.
- This engine works offline, storing the dataset locally and performing unsupervised learning on the user’s wardrobe to generate stylish, personalized outfits.
![Alt text](IMG_1378.JPEG?raw=true "Title")
## Future Enhancements
While the current app focuses on basic outfit recommendations, future updates will include features such as:
- **Event-Based Suggestions**: Tailoring outfits for specific events like parties or work meetings.
- **Weather-Based Recommendations**: Suggesting clothing based on real-time weather conditions.
- **Outfit Sharing**: Allowing users to share their favorite outfits with friends via social media or in-app sharing options.

## Installation Guide
