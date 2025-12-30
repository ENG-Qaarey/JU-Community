import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

type SlideItem = {
  id: number;
  title: string;
  subtitle: string;
  gradient: readonly [string, string, string];
  iconGradient: readonly [string, string, string];
  accentColor: string;
  iconName: keyof typeof Ionicons.glyphMap;
  particles: string[];
  orbitIcons: string[];
};

const safeIoniconName = (name: string): keyof typeof Ionicons.glyphMap => {
  const glyphMap = Ionicons.glyphMap as Record<string, unknown>;
  if (Object.prototype.hasOwnProperty.call(glyphMap, name)) {
    return name as keyof typeof Ionicons.glyphMap;
  }
  return 'help-circle' as keyof typeof Ionicons.glyphMap;
};

export default function Onboarding() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Animation values
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const particleAnim = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const waveAnim = useRef(new Animated.Value(0)).current;
  const rippleAnim = useRef(new Animated.Value(0)).current;
  const morphAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(0)).current;
  const orbitAnim = useRef(new Animated.Value(0)).current;

  const slides: SlideItem[] = useMemo(
    () => [
      {
        id: 1,
        title: 'Welcome to JU Hub',
        subtitle:
          "Your gateway to Jazeera University's digital campus experience. Connect, learn, and grow with our comprehensive platform.",
        gradient: ['#FFFFFF', '#E3F2FD', '#BBDEFB'] as const,
        iconGradient: ['#1976D2', '#2196F3', '#64B5F6'] as const,
        accentColor: '#1976D2',
        iconName: 'school',
        particles: ['book', 'library', 'graduation', 'ribbon'],
        orbitIcons: ['rocket', 'flash', 'star', 'trending-up'],
      },
      {
        id: 2,
        title: 'Stay Connected',
        subtitle:
          'Access courses, connect with peers, and join vibrant student communities. Never miss an important update.',
        gradient: ['#FFFFFF', '#E8F5E8', '#C8E6C9'] as const,
        iconGradient: ['#2E7D32', '#4CAF50', '#81C784'] as const,
        accentColor: '#2E7D32',
        iconName: 'people',
        particles: ['chatbubbles', 'notifications', 'share-social', 'heart'],
        orbitIcons: ['globe', 'wifi', 'megaphone', 'calendar'],
      },
      {
        id: 3,
        title: 'Learn Anywhere',
        subtitle:
          'Seamless mobile experience designed for modern learning on the go. Your education, your schedule.',
        gradient: ['#FFFFFF', '#E3F2FD', '#BBDEFB'] as const,
        iconGradient: ['#1976D2', '#2196F3', '#64B5F6'] as const,
        accentColor: '#1976D2',
        iconName: 'phone-portrait',
        particles: ['time', 'location', 'cloud-download', 'play-circle'],
        orbitIcons: ['tablet-portrait', 'laptop', 'watch', 'headset'],
      },
    ],
    []
  );

  // Enhanced animations
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(morphAnim, {
          toValue: 1,
          duration: 12000,
          easing: Easing.bezier(0.4, 0, 0.2, 1),
          useNativeDriver: false,
        }),
        Animated.timing(morphAnim, {
          toValue: 0,
          duration: 12000,
          easing: Easing.bezier(0.4, 0, 0.2, 1),
          useNativeDriver: false,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.timing(orbitAnim, {
        toValue: 1,
        duration: 15000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    Animated.loop(
      Animated.timing(waveAnim, {
        toValue: 1,
        duration: 8000,
        easing: Easing.inOut(Easing.sin),
        useNativeDriver: true,
      })
    ).start();

    Animated.loop(
      Animated.timing(rippleAnim, {
        toValue: 1,
        duration: 3000,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      })
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(particleAnim, {
          toValue: 1,
          duration: 18000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(particleAnim, {
          toValue: 0,
          duration: 18000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 2500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0.3,
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 1500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 20000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [
    bounceAnim,
    floatAnim,
    glowAnim,
    morphAnim,
    orbitAnim,
    particleAnim,
    pulseAnim,
    rippleAnim,
    rotateAnim,
    waveAnim,
  ]);

  useEffect(() => {
    fadeAnim.setValue(0);
    scaleAnim.setValue(0.8);
    progressAnim.setValue(currentSlide / (slides.length - 1));

    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -width * currentSlide,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 400,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [currentSlide, fadeAnim, progressAnim, scaleAnim, slideAnim, slides.length]);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      router.replace('/auth/login');
    }
  };

  const skipToEnd = () => {
    setCurrentSlide(slides.length - 1);
  };

  const renderFloatingParticles = () => {
    const particles = [];
    const particleCount = 16;

    for (let i = 0; i < particleCount; i++) {
      const size = Math.random() * 20 + 12;
      const startX = Math.random() * width;
      const startY = Math.random() * height * 0.8;
      const particleIcon = slides[currentSlide].particles[i % slides[currentSlide].particles.length];

      particles.push(
        <Animated.View
          key={i}
          style={[
            styles.floatingParticle,
            {
              width: size,
              height: size,
              left: startX,
              top: startY,
              backgroundColor: `rgba(255, 255, 255, ${Math.random() * 0.4 + 0.2})`,
              transform: [
                {
                  translateY: particleAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, Math.random() * 100 - 50],
                  }),
                },
                {
                  translateX: particleAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, Math.random() * 80 - 40],
                  }),
                },
                {
                  rotate: particleAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', `${Math.random() * 360}deg`],
                  }),
                },
                {
                  scale: particleAnim.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [1, 1.2, 1],
                  }),
                },
              ],
              opacity: particleAnim.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0.3, 0.8, 0.3],
              }),
            },
          ]}
        >
          <Ionicons
            name={safeIoniconName(particleIcon)}
            size={size * 0.6}
            color={slides[currentSlide].accentColor}
          />
        </Animated.View>
      );
    }
    return particles;
  };

  const renderOrbitingIcons = () => {
    const orbitIcons: React.ReactElement[] = [];
    const currentSlideData = slides[currentSlide];

    currentSlideData.orbitIcons.forEach((icon, index) => {
      const angle = (index / currentSlideData.orbitIcons.length) * Math.PI * 2;
      const radius = 80;

      orbitIcons.push(
        <Animated.View
          key={index}
          style={[
            styles.orbitIcon,
            {
              transform: [
                {
                  translateX: orbitAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, Math.cos(angle) * radius],
                  }),
                },
                {
                  translateY: orbitAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, Math.sin(angle) * radius],
                  }),
                },
                {
                  rotate: orbitAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg'],
                  }),
                },
                {
                  scale: pulseAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.1],
                  }),
                },
              ],
            },
          ]}
        >
          <Ionicons name={safeIoniconName(icon)} size={20} color={currentSlideData.accentColor} />
        </Animated.View>
      );
    });

    return orbitIcons;
  };

  const renderAnimatedBackground = () => {
    return (
      <View style={styles.backgroundContainer}>
        <LinearGradient
          colors={slides[currentSlide].gradient}
          style={styles.backgroundGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />

        <Animated.View
          style={[
            styles.morphOverlay,
            {
              opacity: morphAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.1, 0.3],
              }),
              transform: [
                {
                  scale: morphAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.5],
                  }),
                },
              ],
            },
          ]}
        >
          <LinearGradient
            colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.1)', 'transparent']}
            style={StyleSheet.absoluteFill}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
        </Animated.View>

        <View style={styles.particleContainer}>{renderFloatingParticles()}</View>

        <View style={styles.wavesContainer}>
          {[0, 1, 2].map((i) => (
            <Animated.View
              key={i}
              style={[
                styles.wave,
                {
                  bottom: -60 - i * 30,
                  backgroundColor: slides[currentSlide].accentColor,
                  opacity: 0.1 + i * 0.02,
                  transform: [
                    {
                      translateX: waveAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 40 * (i + 1)],
                      }),
                    },
                    {
                      scaleY: waveAnim.interpolate({
                        inputRange: [0, 0.5, 1],
                        outputRange: [1, 1.2, 1],
                      }),
                    },
                  ],
                },
              ]}
            />
          ))}
        </View>

        <View style={styles.geometricContainer}>
          {[0, 1, 2, 3, 4].map((i) => (
            <Animated.View
              key={i}
              style={[
                styles.geometricShape,
                {
                  top: Math.random() * height,
                  left: Math.random() * width,
                  backgroundColor: `rgba(33, 150, 243, ${Math.random() * 0.08 + 0.02})`,
                  transform: [
                    {
                      rotate: rotateAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', `${360 + Math.random() * 180}deg`],
                      }),
                    },
                    {
                      translateY: floatAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, Math.random() * 40 - 20],
                      }),
                    },
                  ],
                },
              ]}
            />
          ))}
        </View>

        <Animated.View
          style={[
            styles.centralGlow,
            {
              backgroundColor: slides[currentSlide].accentColor,
              opacity: glowAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.08, 0.2],
              }),
              transform: [
                {
                  scale: glowAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.4],
                  }),
                },
              ],
            },
          ]}
        />

        <View style={styles.rippleContainer}>
          {[0, 1, 2].map((i) => (
            <Animated.View
              key={i}
              style={[
                styles.ripple,
                {
                  borderColor: slides[currentSlide].accentColor,
                  transform: [
                    {
                      scale: rippleAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 2 + i * 0.5],
                      }),
                    },
                  ],
                  opacity: rippleAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.4, 0],
                  }),
                },
              ]}
            />
          ))}
        </View>
      </View>
    );
  };

  const renderProgressDots = () => {
    return (
      <View style={styles.dotsContainer}>
        {slides.map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setCurrentSlide(index)}
            style={styles.dotTouchable}
          >
            <Animated.View
              style={[
                styles.dot,
                {
                  backgroundColor: currentSlide === index ? slides[currentSlide].accentColor : '#ffff',
                  transform: [
                    {
                      scale:
                        currentSlide === index
                          ? progressAnim.interpolate({
                              inputRange: [0, 1],
                              outputRange: [1, 1.3],
                            })
                          : 1,
                    },
                  ],
                },
              ]}
            />
          </TouchableOpacity>
        ))}
        <Animated.View
          style={[
            styles.progressBar,
            {
              width: progressAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
              backgroundColor: slides[currentSlide].accentColor,
            },
          ]}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {renderAnimatedBackground()}

      <View style={styles.container}>
        <Animated.View
          style={[
            styles.skipButton,
            {
              opacity: fadeAnim,
              transform: [
                {
                  translateY: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-20, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <TouchableOpacity onPress={skipToEnd} style={styles.skipTouchable}>
            <Text style={styles.skipText}>{currentSlide === slides.length - 1 ? '' : 'Skip'}</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={[styles.slidesContainer, { transform: [{ translateX: slideAnim }] }]}>
          {slides.map((slide) => (
            <View key={slide.id} style={styles.slide}>
              <Animated.View
                style={[
                  styles.slideContent,
                  {
                    opacity: fadeAnim,
                    transform: [
                      {
                        translateY: fadeAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [30, 0],
                        }),
                      },
                      { scale: scaleAnim },
                    ],
                  },
                ]}
              >
                <View style={styles.iconOrbitContainer}>
                  {renderOrbitingIcons()}

                  <Animated.View
                    style={[
                      styles.mainIconContainer,
                      {
                        transform: [
                          {
                            translateY: floatAnim.interpolate({
                              inputRange: [0, 1],
                              outputRange: [0, -10],
                            }),
                          },
                          {
                            scale: pulseAnim.interpolate({
                              inputRange: [0, 1],
                              outputRange: [1, 1.05],
                            }),
                          },
                        ],
                      },
                    ]}
                  >
                    <LinearGradient
                      colors={slide.iconGradient}
                      style={styles.mainIconGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    >
                      <Ionicons name={slide.iconName} size={40} color="white" />
                    </LinearGradient>

                    {[0, 1, 2].map((i) => (
                      <Animated.View
                        key={i}
                        style={[
                          styles.pulseRing,
                          {
                            borderColor: slide.accentColor,
                            transform: [
                              {
                                scale: pulseAnim.interpolate({
                                  inputRange: [0, 1],
                                  outputRange: [1, 1.5 + i * 0.2],
                                }),
                              },
                            ],
                            opacity: pulseAnim.interpolate({
                              inputRange: [0, 1],
                              outputRange: [0.6, 0],
                            }),
                          },
                        ]}
                      />
                    ))}
                  </Animated.View>
                </View>

                <View style={styles.textContainer}>
                  <Animated.Text
                    style={[
                      styles.title,
                      {
                        color: '#1A237E',
                        opacity: fadeAnim,
                        transform: [
                          {
                            translateY: fadeAnim.interpolate({
                              inputRange: [0, 1],
                              outputRange: [20, 0],
                            }),
                          },
                        ],
                      },
                    ]}
                  >
                    {slide.title}
                  </Animated.Text>
                  <Animated.Text
                    style={[
                      styles.subtitle,
                      {
                        opacity: fadeAnim,
                        transform: [
                          {
                            translateY: fadeAnim.interpolate({
                              inputRange: [0, 1],
                              outputRange: [15, 0],
                            }),
                          },
                        ],
                      },
                    ]}
                  >
                    {slide.subtitle}
                  </Animated.Text>
                </View>
              </Animated.View>
            </View>
          ))}
        </Animated.View>

        {renderProgressDots()}

        <View style={styles.buttonContainer}>
          <Animated.View
            style={{
              transform: [
                {
                  translateY: bounceAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -6],
                  }),
                },
                {
                  scale: bounceAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.02],
                  }),
                },
              ],
            }}
          >
            <TouchableOpacity style={styles.button} onPress={nextSlide} activeOpacity={0.9}>
              <LinearGradient
                colors={[slides[currentSlide].accentColor, slides[currentSlide].iconGradient[1]]}
                style={styles.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.buttonText}>
                  {currentSlide === slides.length - 1 ? 'Get Started' : 'Continue'}
                </Text>
                <Animated.View
                  style={[
                    styles.buttonIcon,
                    {
                      transform: [
                        {
                          translateX: bounceAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 4],
                          }),
                        },
                      ],
                    },
                  ]}
                >
                  <Ionicons
                    name={currentSlide === slides.length - 1 ? 'checkmark' : 'chevron-forward'}
                    size={20}
                    color="white"
                  />
                </Animated.View>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  morphOverlay: {
    position: 'absolute',
    top: '20%',
    left: '10%',
    right: '10%',
    height: '60%',
    borderRadius: 100,
  },
  particleContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  floatingParticle: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  wavesContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
  },
  wave: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 80,
    borderRadius: 40,
  },
  geometricContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  geometricShape: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  centralGlow: {
    position: 'absolute',
    top: '30%',
    alignSelf: 'center',
    width: 180,
    height: 180,
    borderRadius: 90,
  },
  rippleContainer: {
    position: 'absolute',
    top: '40%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ripple: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
  },
  container: {
    flex: 1,
    zIndex: 1,
  },
  skipButton: {
    position: 'absolute',
    top: 50,
    right: 24,
    zIndex: 2,
  },
  skipTouchable: {
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.19)',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(33, 150, 243, 0.1)',
  },
  skipText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1976D2',
  },
  slidesContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  slide: {
    width,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideContent: {
    alignItems: 'center',
    width: '100%',
  },
  iconOrbitContainer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    position: 'relative',
  },
  orbitIcon: {
    position: 'absolute',
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mainIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
    position: 'relative',
  },
  mainIconGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pulseRing: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 25,
    borderWidth: 2,
    backgroundColor: 'transparent',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: -0.5,
    lineHeight: 38,
    textShadowColor: 'rgba(0, 0, 0, 0.05)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#546E7A',
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '500',
    paddingHorizontal: 16,
    letterSpacing: 0.2,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    paddingHorizontal: 24,
    height: 6,
    position: 'relative',
  },
  dotTouchable: {
    padding: 8,
    marginHorizontal: 4,
  },
  dot: {
    width: 32,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  progressBar: {
    position: 'absolute',
    left: 0,
    height: 6,
    borderRadius: 3,
    zIndex: -1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    marginBottom: 50,
  },
  button: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  gradient: {
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  buttonIcon: {
    marginLeft: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
