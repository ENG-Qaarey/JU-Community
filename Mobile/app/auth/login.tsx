import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Animated, Easing } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

type FloatingShape = {
  size: number;
  top: number;
  left: number;
  colors: [string, string];
  opacity: number;
};

const createShadow = (
  color: string = '#000',
  opacity: number = 0.15,
  radius: number = 10,
  elevation: number = 8,
  heightOffset: number = elevation / 2
) =>
  Platform.select({
    ios: {
      shadowColor: color,
      shadowOpacity: opacity,
      shadowRadius: radius,
      shadowOffset: { width: 0, height: heightOffset },
    },
    android: {
      elevation,
      shadowColor: color,
    },
    default: {
      shadowColor: color,
      shadowOpacity: opacity,
      shadowRadius: radius,
      shadowOffset: { width: 0, height: heightOffset },
    },
  });

type UserType = 'student' | 'teacher';

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [userType, setUserType] = useState<UserType>('student');
  const [rememberMe, setRememberMe] = useState(false);
  const [toast, setToast] = useState({
    visible: false,
    message: '',
    type: 'error' as 'error' | 'success'
  });
  const floatingShapes = useRef<FloatingShape[]>([
    { size: 260, top: -80, left: -40, colors: ['rgba(59,130,246,0.4)', 'rgba(99,102,241,0.2)'], opacity: 0.45 },
    { size: 200, top: 180, left: -120, colors: ['rgba(79,70,229,0.4)', 'rgba(14,165,233,0.2)'], opacity: 0.35 },
    { size: 280, top: 420, left: 220, colors: ['rgba(14,165,233,0.35)', 'rgba(56,189,248,0.15)'], opacity: 0.35 },
    { size: 180, top: 40, left: 240, colors: ['rgba(236,72,153,0.25)', 'rgba(147,51,234,0.2)'], opacity: 0.3 },
  ]).current;
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const logoScale = useRef(new Animated.Value(1)).current;
  const buttonPulse = useRef(new Animated.Value(0)).current;
  const floatingAnimations = useRef(floatingShapes.map(() => new Animated.Value(0))).current;

  // Initialize component with empty inputs
  useEffect(() => {
    // Clear any saved input values
    setId('');
    setPassword('');
    setRememberMe(false);
  }, []);

  useEffect(() => {
    // Start animations when component mounts
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.back(1.7)),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      })
    ]).start();

    // Logo breathing animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(logoScale, {
          toValue: 1.05,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(logoScale, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  useEffect(() => {
    floatingAnimations.forEach((anim, index) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: 1,
            duration: 8000 + index * 1200,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 8000 + index * 1200,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ])
      ).start();
    });

    Animated.loop(
      Animated.sequence([
        Animated.timing(buttonPulse, {
          toValue: 1,
          duration: 2500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(buttonPulse, {
          toValue: 0,
          duration: 2500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleLogin = async () => {
    const trimmedId = id.trim();
    const trimmedPassword = password.trim();

    if (userType === 'student') {
      if (trimmedId === '837' && trimmedPassword === '12345') {
        // Valid student login
      } else {
        triggerErrorFeedback('Invalid student ID or password');
        return;
      }
    } else { // teacher/admin
      if (trimmedId.toLowerCase() === 'jamiila' && trimmedPassword === 'Jamila123') {
        // Valid teacher login
      } else {
        triggerErrorFeedback('Invalid username or password');
        return;
      }
    }

    // Save credentials if Remember Me is checked
    if (rememberMe) {
      try {
        await AsyncStorage.setItem('savedCredentials', JSON.stringify({
          id: trimmedId,
          password: trimmedPassword,
          userType
        }));
      } catch (error) {
        console.error('Error saving credentials:', error);
      }
    } else {
      // Clear any saved credentials if Remember Me is not checked
      try {
        await AsyncStorage.removeItem('savedCredentials');
      } catch (error) {
        console.error('Error clearing credentials:', error);
      }
    }

    setIsLoading(true);
    // TODO: Replace with real authentication request
    setTimeout(() => {
      setIsLoading(false);
      router.replace('/(tabs)');
    }, 1500);
  };

  const triggerErrorFeedback = (message: string): void => {
    // Show toast without shaking animation
    setToast({
      visible: true,
      message,
      type: 'error'
    });

    // Hide toast after 3 seconds
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 3000);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <>
      <LinearGradient
        colors={['#f4f7fb', '#dbeafe', '#fef9ff']}
        style={styles.container}
      >
      <View style={styles.decorLayer}>
        {floatingShapes.map((shape, index) => {
          const translateY = floatingAnimations[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0, 25],
          });
          const translateX = floatingAnimations[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0, -15],
          });
          const rotate = floatingAnimations[index].interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '12deg'],
          });

          return (
            <Animated.View
              key={`shape-${index}`}
              style={[
                styles.floatingShape,
                {
                  width: shape.size,
                  height: shape.size,
                  top: shape.top,
                  left: shape.left,
                  opacity: shape.opacity,
                  transform: [{ translateY }, { translateX }, { rotate }],
                },
              ]}
            >
              <LinearGradient
                colors={shape.colors}
                style={styles.shapeGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              />
            </Animated.View>
          );
        })}
      </View>

      <KeyboardAvoidingView 
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Animated.ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section */}
          <Animated.View style={[
            styles.header,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }, { scale: scaleAnim }]
            }
          ]}>
            <Animated.View style={[styles.logoContainer, { transform: [{ scale: logoScale }] }]}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>JU Hub</Text>
                <Text style={styles.subtitle}>jazeera University Community Platform</Text>
              </View>
            </Animated.View>
          </Animated.View>

          {/* Login Form */}
          <Animated.View 
            style={[
              styles.form,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            {/* User Type Toggle */}
            <View style={styles.userTypeContainer}>
              <TouchableOpacity 
                style={[
                  styles.userTypeButton, 
                  userType === 'student' && styles.userTypeButtonActive
                ]}
                onPress={() => setUserType('student')}
              >
                <Text style={[
                  styles.userTypeText,
                  userType === 'student' && styles.userTypeTextActive
                ]}>
                  Student
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[
                  styles.userTypeButton, 
                  userType === 'teacher' && styles.userTypeButtonActive
                ]}
                onPress={() => setUserType('teacher')}
              >
                <Text style={[
                  styles.userTypeText,
                  userType === 'teacher' && styles.userTypeTextActive
                ]}>
                  Teacher/Admin
                </Text>
              </TouchableOpacity>
            </View>

            {/* Student ID Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                <Ionicons name="person-circle-outline" size={16} color="#3b82f6" /> {userType === 'student' ? 'STUDENT ID' : 'USERNAME'}
              </Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder={userType === 'student' ? 'Enter student ID' : 'Enter username'}
                  placeholderTextColor="#9ca3af"
                  value={id}
                  onChangeText={setId}
                  keyboardType={userType === 'student' ? 'numeric' : 'default'}
                  autoCapitalize="none"
                  autoComplete="off"
                  autoCorrect={false}
                  textContentType="none"
                  selectionColor="#3b82f6"
                />
                {id.length > 0 && (
                  <TouchableOpacity onPress={() => setId('')} style={styles.clearButton}>
                    <Ionicons name="close-circle" size={20} color="#d1d5db" />
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                <Ionicons name="lock-closed-outline" size={16} color="#3b82f6" /> PASSWORD
              </Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  placeholderTextColor="#9ca3af"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!isPasswordVisible}
                  autoCapitalize="none"
                  autoComplete="off"
                  autoCorrect={false}
                  textContentType="none"
                  selectionColor="#3b82f6"
                />
                <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeButton}>
                  <Ionicons 
                    name={isPasswordVisible ? "eye-off" : "eye"} 
                    size={20} 
                    color="#3b82f6" 
                  />
                </TouchableOpacity>
              </View>
            </View>

            

            {/* Remember Me & Forgot Password */}
            <View style={styles.helpersContainer}>
              <TouchableOpacity 
                style={styles.rememberMe}
                onPress={() => setRememberMe(!rememberMe)}
                activeOpacity={0.7}
              >
                <View style={[
                  styles.checkbox,
                  rememberMe && styles.checkboxChecked
                ]}>
                  {rememberMe && <Ionicons name="checkmark" size={14} color="#ffffff" />}
                </View>
                <Text style={styles.rememberText}>Remember me</Text>
              </TouchableOpacity>
              
              <TouchableOpacity>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <Animated.View 
              style={[
                styles.loginButton, 
                isLoading && styles.loginButtonDisabled,
                (!id || !password) && styles.loginButtonDisabled,
                {
                  transform: [
                    {
                      scale: buttonPulse.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 1.015],
                      }),
                    },
                  ],
                },
              ]}
            >
              <TouchableOpacity 
                style={styles.buttonTouchable}
                onPress={handleLogin}
                disabled={isLoading || !id || !password}
              >
                <LinearGradient
                  colors={(!id || !password) ? ['#cbd5f5', '#a5b4fc'] : ['#6366f1', '#3b82f6']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.gradientButton}
                >
                  {isLoading ? (
                    <Animated.View style={styles.loadingContainer}>
                      <Ionicons name="refresh" size={20} color="#ffffff" />
                      <Text style={styles.loginButtonText}>Signing In...</Text>
                    </Animated.View>
                  ) : (
                    <>
                      <Ionicons name="log-in-outline" size={20} color="#ffffff" />
                      <Text style={styles.loginButtonText}>Sign In to JU Hub</Text>
                    </>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>

            {/* Demo Credentials 
            <View style={styles.demoContainer}>
              <View style={styles.demoHeader}>
                <Ionicons name="information-circle" size={18} color="#3b82f6" />
                <Text style={styles.demoTitle}>Demo Credentials</Text>
              </View>
              <View style={styles.credentialsGrid}>
                <View style={styles.credentialItem}>
                  <Text style={styles.credentialLabel}>Student ID:</Text>
                  <Text style={styles.credentialValue}>837</Text>
                </View>
                <View style={styles.credentialItem}>
                  <Text style={styles.credentialLabel}>Password:</Text>
                  <Text style={styles.credentialValue}>12345</Text>
                </View>
              </View>
            </View> */}

            {/* Sign Up Prompt */}
            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>New to JU Hub? </Text>
              <TouchableOpacity>
                <Text style={styles.signupLink}>Create Account</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>

          {/* Footer */}
          <Animated.View 
            style={[
              styles.footer,
              { opacity: fadeAnim }
            ]}
          >
            <Text style={styles.footerText}>🎓 JU Hub Community Platform</Text>
            <Text style={styles.footerSubtext}>Connecting Students • Version 1.0</Text>
          </Animated.View>
        </Animated.ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>

    {/* Toast Notification */}
    <AnimatedToast
      visible={toast.visible}
      message={toast.message}
      type={toast.type}
      onDismiss={() => setToast(prev => ({ ...prev, visible: false }))}
    />
    </>
  );
};

export default Login;

// Toast Component
interface AnimatedToastProps {
  visible: boolean;
  message: string;
  type: 'success' | 'error' | 'info';
  onDismiss: () => void;
}

const AnimatedToast = ({ visible, message, type, onDismiss }: AnimatedToastProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(100)).current; // Start off-screen to the right

  useEffect(() => {
    let animation: Animated.CompositeAnimation | null = null;
    let timer: ReturnType<typeof setTimeout> | null = null;

    if (visible) {
      // Start show animation
      // Smoother entrance animation
      animation = Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.out(Easing.cubic),
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
          easing: Easing.out(Easing.cubic),
        })
      ]);
      
      // Auto-dismiss after 3 seconds
      timer = setTimeout(() => {
        onDismiss();
      }, 3000);
    } else {
      // Smoother exit animation
      animation = Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.in(Easing.cubic),
        }),
        Animated.timing(slideAnim, {
          toValue: 100, // Slide off-screen to the right
          duration: 350,
          useNativeDriver: true,
          easing: Easing.in(Easing.cubic),
        })
      ]);
    }

    if (animation) {
      animation.start();
    }

    // Cleanup function
    return () => {
      if (animation) {
        animation.stop();
      }
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [visible, fadeAnim, slideAnim, onDismiss]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.toastContainer,
        {
          backgroundColor: type === 'error' ? '#e20606c1' : '#10b981',
          opacity: fadeAnim,
          transform: [{ translateX: slideAnim }],
          right: 20,
          top: 60,
        },
      ]}
    >
      <Ionicons 
        name={type === 'error' ? 'alert-circle' : 'checkmark-circle'} 
        size={24} 
        color="white" 
        style={styles.toastIcon}
      />
      <Text style={styles.toastText}>{message}</Text>
      <TouchableOpacity onPress={onDismiss} style={styles.toastCloseButton}>
        <Ionicons name="close" size={20} color="white" />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  // Toast Styles
  toastContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    zIndex: 1000,
    right: 20,
    maxWidth: '90%',
    // Initial position off-screen to the right
    transform: [{ translateX: 100 }],
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  toastIcon: {
    marginRight: 10,
  },
  toastText: {
    flex: 1,
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  toastCloseButton: {
    padding: 4,
    marginLeft: 10,
  },
  container: {
    flex: 1,
    position: 'relative',
  },
  decorLayer: {
    ...StyleSheet.absoluteFillObject,
  },
  floatingShape: {
    position: 'absolute',
    borderRadius: 999,
    overflow: 'hidden',
  },
  shapeGradient: {
    flex: 1,
    borderRadius: 999,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 25,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    ...(createShadow('#1f2937', 0.2, 20, 15, 10) as object),
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 5,
    textShadowColor: 'rgba(59, 130, 246, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
  },
  form: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
    padding: 20,
    borderRadius: 28,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: 'rgba(23, 101, 211, 0.2)',
    // ...(createShadow('#1f2937', 0.18, 25, 18, 2) as object),
  },
  inputContainer: {
    marginBottom: 25,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 8,
    letterSpacing: 1,
  },
  inputWrapper: {
    position: 'relative',
  },
  userTypeContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  userTypeButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  userTypeButtonActive: {
    backgroundColor: '#3b82f6',
  },
  userTypeText: {
    color: '#6b7280',
    fontWeight: '600',
  },
  userTypeTextActive: {
    color: 'white',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.41)',
    borderWidth: 1.5,
    borderColor: 'rgba(148,163,184,0.4)',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 16,
    color: '#1f2937',
    fontWeight: '500',
    paddingRight: 50,
  },
  clearButton: {
    position: 'absolute',
    right: 15,
    top: 14,
    padding: 4,
  },
  eyeButton: {
    position: 'absolute',
    right: 15,
    top: 14,
    padding: 4,
  },
  helpersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  rememberMe: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#d1d5db',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  checkboxChecked: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  rememberText: {
    fontSize: 14,
    color: '#374151',
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '600',
  },
  loginButton: {
    borderRadius: 16,
    marginBottom: 20,
    ...(createShadow('#6366f1', 0.35, 18, 12, 12) as object),
  },
  buttonTouchable: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  gradientButton: {
    paddingVertical: 18,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 8,
  },
  demoContainer: {
    backgroundColor: '#dbeafe',
    padding: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
    marginBottom: 20,
  },
  demoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    justifyContent: 'center',
  },
  demoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#374151',
    marginLeft: 6,
  },
  credentialsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  credentialItem: {
    alignItems: 'center',
  },
  credentialLabel: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '600',
    marginBottom: 4,
  },
  credentialValue: {
    fontSize: 16,
    color: '#1f2937',
    fontWeight: '700',
    fontFamily: 'monospace',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    fontSize: 14,
    color: '#6b7280',
  },
  signupLink: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    color: '#9ca3af',
  },
});