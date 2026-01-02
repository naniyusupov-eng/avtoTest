import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Modal, Alert, Dimensions, FlatList, Animated, StatusBar, Platform, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScreenLayout } from '../components/ScreenLayout';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';



const { width } = Dimensions.get('window');
const QUESTION_WIDTH = width;

// Generate Mock Data
const generateQuestions = (ticketId: number | string, mode?: string) => {
    if (mode === 'thematic') {
        return Array.from({ length: 50 }, (_, i) => {
            return {
                id: i + 1,
                text: `Mavzuga oid savol matni... Chorrahalarda harakatlanish qoidalari haqida.`,
                image: Math.random() > 0.5 ? 'https://plus.unsplash.com/premium_photo-1664303847960-586318f59035?q=80&w=800&auto=format&fit=crop' : null,
                options: [
                    { id: '1', text: 'Birinchi javob varianti' },
                    { id: '2', text: 'Ikkinchi javob varianti' },
                    { id: '3', text: 'Uchinchi javob varianti' },
                    { id: '4', text: 'To\'rtinchi javob varianti' },
                ],
                correctOptionId: String(Math.floor(Math.random() * 4) + 1),
                explanation: `Mavzuga oid batafsil izoh.`
            };
        });
    }
    if (mode === 'exam50') {
        return Array.from({ length: 50 }, (_, i) => {
            const rndTicket = Math.floor(Math.random() * 70) + 1;
            const rndQ = Math.floor(Math.random() * 20) + 1;
            return {
                id: i + 1,
                text: `Chorrahada harakatlanish tartibi qanday? Ushbu vaziyatda kim birinchi o'tish huquqiga ega?`,
                image: Math.random() > 0.5 ? 'https://plus.unsplash.com/premium_photo-1664303847960-586318f59035?q=80&w=800&auto=format&fit=crop' : null,
                ticketId: rndTicket,
                options: [
                    { id: '1', text: 'Asosiy yo\'ldagi avtomobil' },
                    { id: '2', text: 'O\'ng tomondagi avtomobil' },
                    { id: '3', text: 'To\'xtash shart' },
                    { id: '4', text: 'Chapdagi avtomobil' },
                ],
                correctOptionId: String(Math.floor(Math.random() * 4) + 1),
                explanation: `Yo'l harakati qoidalari bo'yicha javob.`
            };
        });
    }
    if (mode === 'exam10') {
        return Array.from({ length: 10 }, (_, i) => {
            const rndTicket = Math.floor(Math.random() * 70) + 1;
            const rndQ = Math.floor(Math.random() * 20) + 1;
            return {
                id: i + 1,
                text: `Chorrahada harakatlanish tartibi qanday? Ushbu vaziyatda kim birinchi o'tish huquqiga ega?`,
                image: Math.random() > 0.5 ? 'https://plus.unsplash.com/premium_photo-1664303847960-586318f59035?q=80&w=800&auto=format&fit=crop' : null,
                options: [
                    { id: '1', text: 'Asosiy yo\'ldagi avtomobil' },
                    { id: '2', text: 'O\'ng tomondagi avtomobil' },
                    { id: '3', text: 'To\'xtash shart' },
                    { id: '4', text: 'Chapdagi avtomobil' },
                ],
                correctOptionId: String(Math.floor(Math.random() * 4) + 1),
                explanation: `Yo'l harakati qoidalari bo'yicha javob.`
            };
        });
    }
    if (mode === 'marathon') {
        return Array.from({ length: 50 }, (_, i) => {
            const rndTicket = Math.floor(Math.random() * 70) + 1;
            const rndQ = Math.floor(Math.random() * 20) + 1;
            return {
                id: i + 1,
                text: `Chorrahada harakatlanish tartibi qanday? Ushbu vaziyatda kim birinchi o'tish huquqiga ega?`,
                image: Math.random() > 0.5 ? 'https://plus.unsplash.com/premium_photo-1664303847960-586318f59035?q=80&w=800&auto=format&fit=crop' : null,
                options: [
                    { id: '1', text: 'Asosiy yo\'ldagi avtomobil' },
                    { id: '2', text: 'O\'ng tomondagi avtomobil' },
                    { id: '3', text: 'To\'xtash shart' },
                    { id: '4', text: 'Chapdagi avtomobil' },
                ],
                correctOptionId: String(Math.floor(Math.random() * 4) + 1),
                explanation: `Yo'l harakati qoidalari bo'yicha javob.`
            };
        });
    }
    if (mode === 'exam20') {
        return Array.from({ length: 20 }, (_, i) => {
            const rndTicket = Math.floor(Math.random() * 70) + 1;
            const rndQ = Math.floor(Math.random() * 20) + 1;
            return {
                id: i + 1,
                text: `Chorrahada harakatlanish tartibi qanday? Ushbu vaziyatda kim birinchi o'tish huquqiga ega?`,
                image: Math.random() > 0.5 ? 'https://plus.unsplash.com/premium_photo-1664303847960-586318f59035?q=80&w=800&auto=format&fit=crop' : null,
                options: [
                    { id: '1', text: 'Asosiy yo\'ldagi avtomobil' },
                    { id: '2', text: 'O\'ng tomondagi avtomobil' },
                    { id: '3', text: 'To\'xtash shart' },
                    { id: '4', text: 'Chapdagi avtomobil' },
                ],
                correctOptionId: String(Math.floor(Math.random() * 4) + 1),
                explanation: `Yo'l harakati qoidalari bo'yicha javob.`
            };
        });
    }

    return Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        text: `Chorrahada harakatlanish tartibi qanday? Ushbu vaziyatda kim birinchi o'tish huquqiga ega?`,
        image: i % 2 === 0 ? 'https://plus.unsplash.com/premium_photo-1664303847960-586318f59035?q=80&w=800&auto=format&fit=crop' : null,
        options: [
            { id: '1', text: 'Asosiy yo\'ldagi avtomobil' },
            { id: '2', text: 'O\'ng tomondagi avtomobil' },
            { id: '3', text: 'To\'xtash shart' },
            { id: '4', text: 'Chapdagi avtomobil' },
        ],
        correctOptionId: String((i % 4) + 1),
        explanation: `Yo'l harakati qoidalari 15-bandiga ko'ra, teng ahamiyatli yo'llarda o'ngdan kelayotgan transport vositasiga yo'l berish kerak.`
    }));
};

export const TicketDetailScreen = ({ route, navigation }: any) => {
    const { ticketNumber, mode } = route.params;
    const { isDark } = useTheme();
    const { t } = useTranslation();
    const insets = useSafeAreaInsets();


    const [questions] = useState(() => {
        if (route.params?.customQuestions) return route.params.customQuestions;
        const all = generateQuestions(ticketNumber, mode);
        if (mode === 'saved' && route.params?.initialIndex !== undefined) {
            return [all[route.params.initialIndex]];
        }
        return all;
    });
    const [currentIdx, setCurrentIdx] = useState(mode === 'saved' ? 0 : (route.params?.initialIndex || 0));
    const [timeLeft, setTimeLeft] = useState(mode === 'exam50' ? 50 * 60 : (mode === 'exam10' ? 10 * 60 : (mode === 'thematic' ? 50 * 60 : 25 * 60)));
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});
    const [results, setResults] = useState<{ [key: number]: boolean }>({});
    const [isExplanationVisible, setExplanationVisible] = useState(false);
    const [isFinished, setFinished] = useState(false);

    const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

    const loadSavedQuestions = async () => {
        try {
            const stored = await AsyncStorage.getItem('saved_questions');
            if (stored) {
                const parsed = JSON.parse(stored);
                const ids = new Set<string>(parsed.map((item: any) => item.uid));
                setSavedIds(ids);
            }
        } catch (e) {
            console.error('Failed to load saved items', e);
        }
    };

    useEffect(() => {
        loadSavedQuestions();
    }, []);

    const toggleSave = async () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        const currentQuestion = questions[currentIdx];
        const uid = `${ticketNumber}-${currentQuestion.id}`;

        try {
            const stored = await AsyncStorage.getItem('saved_questions');
            let items = stored ? JSON.parse(stored) : [];
            const newSavedIds = new Set(savedIds);

            if (newSavedIds.has(uid)) {
                items = items.filter((i: any) => i.uid !== uid);
                newSavedIds.delete(uid);
            } else {
                items.push({
                    uid,
                    ticketNumber,
                    questionId: currentQuestion.id,
                    text: currentQuestion.text,
                    timestamp: Date.now()
                });
                newSavedIds.add(uid);
            }

            setSavedIds(newSavedIds);
            await AsyncStorage.setItem('saved_questions', JSON.stringify(items));
        } catch (e) {
            console.error('Failed to save item', e);
        }
    };



    const flatListRef = useRef<FlatList>(null);
    const paginationRef = useRef<FlatList>(null);

    // Fade In Animation for Content
    const fadeAnim = useRef(new Animated.Value(0)).current;

    // Refs for auto-save on exit
    const resultsRef = useRef(results);
    const isFinishedRef = useRef(isFinished);


    useEffect(() => { resultsRef.current = results; }, [results]);
    useEffect(() => { isFinishedRef.current = isFinished; }, [isFinished]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', () => {
            if (!isFinishedRef.current && (!mode || mode === 'ticket')) {
                const currentResults = resultsRef.current;
                const answeredCount = Object.keys(currentResults).length;

                if (answeredCount > 0) {
                    const saveProgress = async () => {
                        const correctCount = Object.values(currentResults).filter(Boolean).length;
                        const wrongCount = Object.values(currentResults).filter(r => r === false).length;

                        try {
                            const stored = await AsyncStorage.getItem('tickets_progress');
                            const progress = stored ? JSON.parse(stored) : {};

                            progress[ticketNumber] = {
                                status: 'in_progress',
                                score: correctCount,
                                wrong: wrongCount
                            };

                            await AsyncStorage.setItem('tickets_progress', JSON.stringify(progress));
                        } catch (err) {
                            console.error('Failed to save in-progress', err);
                        }
                    };
                    saveProgress();
                }
            }
        });
        return unsubscribe;
    }, [navigation, mode, ticketNumber]);


    useEffect(() => {
        Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }).start();
    }, []);

    // Timer Logic
    useEffect(() => {
        if (isFinished || mode === 'saved' || mode === 'marathon') return;
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setFinished(true);
                    Alert.alert(t('time_up'), t('exam_finished'));
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [isFinished]);

    // Save Progress Logic
    useEffect(() => {
        if (isFinished) {
            const save = async () => {
                if (!mode || mode === 'ticket') { // Only for standard tickets
                    const correctCount = Object.values(results).filter(Boolean).length;
                    const wrongCount = Object.values(results).filter(r => r === false).length;

                    try {
                        const stored = await AsyncStorage.getItem('tickets_progress');
                        const progress = stored ? JSON.parse(stored) : {};

                        // Pass if <= 2 mistakes
                        const passed = wrongCount <= 2;

                        progress[ticketNumber] = {
                            status: passed ? 'completed' : 'failed',
                            score: correctCount,
                            wrong: wrongCount
                        };

                        await AsyncStorage.setItem('tickets_progress', JSON.stringify(progress));
                    } catch (e) {
                        console.error('Failed to save progress', e);
                    }
                }
            };
            save();
        }
    }, [isFinished]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
    };

    const handleAnswer = (optionId: string) => {
        if (answers[currentIdx] || isFinished) return;
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

        const isCorrect = optionId === questions[currentIdx].correctOptionId;
        const newAnswers = { ...answers, [currentIdx]: optionId };
        const newResults = { ...results, [currentIdx]: isCorrect };

        setAnswers(newAnswers);
        setResults(newResults);

        if (isCorrect) {
            setTimeout(() => scrollToIndex(currentIdx + 1), 1200);
        } else {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);

            // Save mistake to registry
            const currentQ = questions[currentIdx];
            const uid = `${currentQ.ticketId || ticketNumber || 'gen'}-${currentQ.id}`; // Ensure uniqueness
            AsyncStorage.getItem('mistake_registry').then(stored => {
                const registry = stored ? JSON.parse(stored) : {};
                const current = registry[uid] || { count: 0, question: currentQ };
                current.count += 1;
                // Update question content just in case, but keep count
                registry[uid] = { count: current.count, question: currentQ };
                AsyncStorage.setItem('mistake_registry', JSON.stringify(registry));
            });

            // Check for 3 mistakes
            const wrongCount = Object.values(newResults).filter(r => r === false).length;
            const isExamMode = mode?.startsWith('exam'); // exam50, exam10, exam20

            if (wrongCount >= 3 && isExamMode) {
                setFinished(true);
                return;
            }
        }

        // Check completion (all 20 answered)
        if (Object.keys(newAnswers).length === questions.length) {
            if (mode !== 'saved') {
                setFinished(true);
            }
        }
    };

    const scrollToIndex = (index: number) => {
        if (index < 0 || index >= questions.length) {
            if (index >= questions.length && mode !== 'saved') {
                // Check if all answered
                if (Object.keys(answers).length === questions.length) {
                    setFinished(true);
                }
                // Else: Do nothing, stay on last screen (user request matches this behavior)
            }
            return;
        }
        flatListRef.current?.scrollToIndex({ index, animated: true });
        setCurrentIdx(index);
        paginationRef.current?.scrollToIndex({ index, animated: true, viewPosition: 0.5 });
    };

    const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
            const index = viewableItems[0].index;
            if (index !== null) {
                setCurrentIdx(index);
                paginationRef.current?.scrollToIndex({ index, animated: true, viewPosition: 0.5 });
            }
        }
    }).current;

    const renderHeader = () => (
        <View style={[styles.header, { paddingTop: insets.top + 10, backgroundColor: isDark ? '#0F172A' : '#FFF' }]}>

            <View style={[styles.headerTop, { position: 'relative' }]}>
                {/* Left */}
                <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={isDark ? '#FFF' : '#1E293B'} />
                </Pressable>

                {/* Center Title - Absolute for perfect centering */}
                <View pointerEvents="none" style={{ position: 'absolute', left: 0, right: 0, alignItems: 'center', zIndex: -1 }}>
                    <Text style={[styles.timerText, { color: isDark ? '#FFF' : '#1E293B' }]} numberOfLines={1}>
                        {mode === 'marathon' ? 'Marafon' :
                            (mode === 'thematic' ? (route.params.topicTitle || 'Mavzu') :
                                (mode === 'exam50' ? 'Katta Test' :
                                    (mode === 'exam20' ? 'Imtihon' :
                                        (mode === 'exam10' ? 'Mini Test' : `${ticketNumber}-${t('ticket', 'Bilet').toLowerCase()}`))))}
                    </Text>
                </View>

                {/* Right Timer or Finish Button */}
                <View style={styles.headerActions}>
                    {mode === 'marathon' && (
                        <Pressable
                            onPress={() => setFinished(true)}
                            style={{ backgroundColor: '#EF4444', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 }}
                        >
                            <Text style={{ color: '#FFF', fontWeight: '700', fontSize: 13 }}>Yakunlash</Text>
                        </Pressable>
                    )}
                    {mode !== 'saved' && mode !== 'marathon' && (
                        <View style={{ backgroundColor: isDark ? '#1E293B' : '#F1F5F9', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 }}>
                            <Text style={{ fontSize: 14, fontWeight: '700', fontVariant: ['tabular-nums'], color: timeLeft < 60 ? '#EF4444' : (isDark ? '#E2E8F0' : '#475569') }}>
                                {formatTime(timeLeft)}
                            </Text>
                        </View>
                    )}
                </View>
            </View>

            {/* Numbered Pagination Strip - Hidden in Saved Mode and Marathon */}
            {mode === 'marathon' && (
                <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 24, paddingBottom: 12 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                        <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                        <Text style={{ color: '#10B981', fontWeight: '800', fontSize: 16 }}>
                            {Object.values(results).filter(r => r).length}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                        <Ionicons name="close-circle" size={20} color="#EF4444" />
                        <Text style={{ color: '#EF4444', fontWeight: '800', fontSize: 16 }}>
                            {Object.values(results).filter(r => r === false).length}
                        </Text>
                    </View>
                </View>
            )}

            {mode !== 'saved' && mode !== 'marathon' && (
                <FlatList
                    ref={paginationRef}
                    data={questions}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.paginationContent}
                    renderItem={({ item, index }) => {
                        const status = results[index];
                        const isActive = index === currentIdx;

                        let bgColor = isDark ? '#334155' : '#F1F5F9';
                        let textColor = isDark ? '#94A3B8' : '#64748B';
                        let borderColor = 'transparent';

                        if (answers[index]) {
                            bgColor = status ? '#10B981' : '#EF4444';
                            textColor = '#FFF';
                        }
                        if (isActive) {
                            borderColor = '#3B82F6';
                            if (!answers[index]) {
                                bgColor = '#EFF6FF';
                                textColor = '#3B82F6';
                            }
                        }

                        return (
                            <Pressable
                                onPress={() => scrollToIndex(index)}
                                style={[
                                    styles.pageNumberBox,
                                    { backgroundColor: bgColor, borderColor: isActive ? borderColor : 'transparent', borderWidth: isActive ? 1 : 0 }
                                ]}
                            >
                                <Text style={[styles.pageNumberText, { color: textColor, fontWeight: isActive ? 'bold' : '500' }]}>
                                    {index + 1}
                                </Text>
                            </Pressable>
                        );
                    }}
                    keyExtractor={item => item.id.toString()}
                />
            )}
        </View>
    );

    const renderQuestion = ({ item, index }: { item: any, index: number }) => {
        const isAnswered = answers[index] !== undefined;

        return (
            <View style={{ width: QUESTION_WIDTH, flex: 1 }}>
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Question Text (No Number Prefix) */}
                    <Text style={[styles.qText, { color: isDark ? '#F1F5F9' : '#1E293B', textAlign: 'center', marginBottom: 32 }]}>
                        {item.text}
                    </Text>

                    {/* Compact Image Placeholder */}
                    {item.image && (
                        <Image
                            source={{ uri: item.image }}
                            style={[styles.imageArea, { backgroundColor: isDark ? '#1E293B' : '#F1F5F9' }]}
                            resizeMode="cover"
                        />
                    )}

                    {/* Options */}
                    <View style={styles.optionsList}>
                        {item.options.map((opt: any, optIndex: number) => {
                            const isSelected = answers[index] === opt.id;
                            const isCorrect = opt.id === item.correctOptionId;
                            const done = answers[index] !== undefined;

                            let borderColor = 'transparent';
                            let bgColor = isDark ? '#1E293B' : '#FFF';
                            let textColor = isDark ? '#E2E8F0' : '#334155';
                            let badgeBg = isDark ? '#334155' : '#F1F5F9';
                            let badgeText = isDark ? '#94A3B8' : '#64748B';

                            if (done) {
                                if (isSelected && !isCorrect) {
                                    bgColor = '#EF4444'; // Solid Red
                                    borderColor = '#EF4444';
                                    textColor = '#FFF';
                                    badgeBg = 'rgba(255,255,255,0.2)';
                                    badgeText = '#FFF';
                                } else if (isCorrect) {
                                    bgColor = '#10B981'; // Solid Green
                                    borderColor = '#10B981';
                                    textColor = '#FFF';
                                    badgeBg = 'rgba(255,255,255,0.2)';
                                    badgeText = '#FFF';
                                }
                            }

                            return (
                                <Pressable
                                    key={opt.id}

                                    onPress={() => handleAnswer(opt.id)}
                                    disabled={done}
                                    style={[
                                        styles.optionBtn,
                                        { backgroundColor: bgColor, borderColor },
                                        !done && isDark && { backgroundColor: '#1E293B' }
                                    ]}
                                >
                                    <View style={[styles.fBadge, { backgroundColor: badgeBg }]}>
                                        <Text style={[styles.fBadgeText, { color: badgeText }]}>F{optIndex + 1}</Text>
                                    </View>
                                    <Text style={[styles.optText, { color: textColor }]}>{opt.text}</Text>
                                </Pressable>
                            )
                        })}
                    </View>

                    {/* Action Buttons Row */}
                    <View style={[styles.actionRow, { gap: 0, justifyContent: 'space-between', marginTop: 'auto', paddingTop: 24 }]}>
                        {/* Explanation Button (Left) */}
                        <Pressable
                            style={{
                                width: 56,
                                height: 56,
                                borderRadius: 16,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: isAnswered ? '#EFF6FF' : (isDark ? '#334155' : '#F1F5F9'),
                                opacity: isAnswered ? 1 : 0.5
                            }}
                            onPress={() => isAnswered && setExplanationVisible(true)}
                            disabled={!isAnswered}
                        >
                            <Ionicons name="bulb-outline" size={24} color={isAnswered ? '#3B82F6' : (isDark ? '#94A3B8' : '#94A3B8')} />
                        </Pressable>

                        {/* Next Button (Center) */}
                        <Pressable
                            style={{
                                flex: 1,
                                height: 56,
                                borderRadius: 16,
                                backgroundColor: '#3B82F6',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginHorizontal: 12
                            }}
                            onPress={() => scrollToIndex(index + 1)}

                        >
                            <Text style={{ color: '#FFF', fontSize: 16, fontWeight: '700', marginRight: 8 }}>{t('next', 'Keyingisi')}</Text>
                            <Ionicons name="arrow-forward" size={20} color="#FFF" />
                        </Pressable>

                        {/* Save Button (Right) */}
                        <Pressable
                            onPress={toggleSave}
                            style={{
                                width: 56,
                                height: 56,
                                borderRadius: 16,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: savedIds.has(`${ticketNumber}-${item.id}`) ? (isDark ? 'rgba(245, 158, 11, 0.15)' : '#FFFBEB') : (isDark ? '#334155' : '#F1F5F9'),
                            }}
                        >
                            <Ionicons
                                name={savedIds.has(`${ticketNumber}-${item.id}`) ? "bookmark" : "bookmark-outline"}
                                size={24}
                                color={savedIds.has(`${ticketNumber}-${item.id}`) ? '#F59E0B' : (isDark ? '#CBD5E1' : '#475569')}
                            />
                        </Pressable>
                    </View>

                </ScrollView>
            </View>
        );
    };

    const renderResult = () => {
        const correctCount = Object.values(results).filter(Boolean).length;
        const wrongCount = Object.values(results).filter(r => r === false).length;
        // Logic: Pass if wrongCount < 3 (standard traffic rules often allow max 2 errors, 3 is fail)
        const isSuccess = wrongCount < 3;

        return (
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24, alignItems: 'center' }}>
                <View style={{ marginBottom: 24 }}>
                    <Ionicons name={isSuccess ? "trophy" : "close-circle"} size={80} color={isSuccess ? "#F59E0B" : "#EF4444"} />
                </View>

                <Text style={{ fontSize: 24, fontWeight: '800', marginBottom: 8, color: isDark ? '#FFF' : '#0F172A', textAlign: 'center' }}>
                    {mode === 'marathon'
                        ? t('marathon_result', 'Marafon Natijasi')
                        : (isSuccess ? t('passed', 'Imtihondan o\'tdingiz!') : t('exam_finished', 'Imtihon yakunlandi'))}
                </Text>
                {isSuccess && mode !== 'marathon' && (
                    <Text style={{ fontSize: 16, color: isDark ? '#94A3B8' : '#64748B', marginBottom: 32, textAlign: 'center' }}>
                        {t('congrats_text', 'Tabriklaymiz! Yaxshi natija.')}
                    </Text>
                )}
                {(mode === 'marathon' || !isSuccess) && <View style={{ height: 24 }} />}

                {/* Big Stats */}
                <View style={{ flexDirection: 'row', gap: 16, marginBottom: 32, width: '100%' }}>
                    <View style={{ flex: 1, backgroundColor: isDark ? '#1E293B' : '#ECFDF5', padding: 16, borderRadius: 20, alignItems: 'center' }}>
                        <Text style={{ fontSize: 32, fontWeight: '800', color: '#10B981' }}>{correctCount}</Text>
                        <Text style={{ fontSize: 14, fontWeight: '600', color: '#059669', opacity: 0.8 }}>{t('correct_short', 'To\'g\'ri')}</Text>
                    </View>
                    <View style={{ flex: 1, backgroundColor: isDark ? '#1E293B' : '#FEF2F2', padding: 16, borderRadius: 20, alignItems: 'center' }}>
                        <Text style={{ fontSize: 32, fontWeight: '800', color: '#EF4444' }}>{wrongCount}</Text>
                        <Text style={{ fontSize: 14, fontWeight: '600', color: '#B91C1C', opacity: 0.8 }}>{t('wrong_short', 'Xato')}</Text>
                    </View>
                </View>

                {/* Grid */}
                {/* Grid */}
                {mode !== 'marathon' && (
                    <View style={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 40 }}>
                        {questions.map((_, i) => {
                            const res = results[i];
                            let bg = isDark ? '#334155' : '#E2E8F0';
                            if (res === true) bg = '#10B981';
                            if (res === false) bg = '#EF4444';
                            return (
                                <View key={i} style={{ width: (width - 48 - (9 * 8)) / 10, height: 30, borderRadius: 6, backgroundColor: bg, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: res !== undefined ? '#FFF' : '#94A3B8', fontWeight: 'bold', fontSize: 12 }}>{i + 1}</Text>
                                </View>
                            )
                        })}
                    </View>
                )}

                {/* Actions */}
                <View style={{ flexDirection: 'row', gap: 12, width: '100%' }}>
                    <Pressable
                        onPress={() => navigation.goBack()}
                        style={{ flex: 1, backgroundColor: isDark ? '#334155' : '#E2E8F0', paddingVertical: 16, borderRadius: 16, alignItems: 'center' }}
                    >
                        <Text style={{ fontSize: 16, fontWeight: '700', color: isDark ? '#FFF' : '#334155' }}>{t('main_menu', 'Asosiy menyu')}</Text>
                    </Pressable>

                    <Pressable
                        onPress={() => {
                            navigation.replace('TicketDetail', route.params);
                        }}
                        style={{ flex: 1, backgroundColor: '#3B82F6', paddingVertical: 16, borderRadius: 16, alignItems: 'center', shadowColor: '#3B82F6', shadowOpacity: 0.2, shadowRadius: 8, elevation: 4 }}
                    >
                        <Text style={{ fontSize: 16, fontWeight: '700', color: '#FFF' }}>{t('retry', 'Qayta urinish')}</Text>
                    </Pressable>
                </View>
            </ScrollView>
        );
    };

    return (
        <View style={[styles.container, { backgroundColor: isDark ? '#0F172A' : '#F8FAFC' }]}>
            <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

            {!isFinished && renderHeader()}

            {isFinished ? renderResult() : (
                <FlatList
                    ref={flatListRef}
                    data={questions}
                    renderItem={renderQuestion}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.id.toString()}
                    onViewableItemsChanged={onViewableItemsChanged}
                    viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
                    scrollEventThrottle={16}
                />
            )}

            {/* Simple Modal */}
            <Modal
                transparent
                visible={isExplanationVisible}
                animationType="fade"
                onRequestClose={() => setExplanationVisible(false)}
            >
                <View style={styles.modalBg}>
                    <View style={[styles.modalCard, { backgroundColor: isDark ? '#1E293B' : '#FFF' }]}>
                        <Text style={[styles.modalTitle, { color: isDark ? '#FFF' : '#0F172A' }]}>{t('explanation', 'Izoh')}</Text>
                        <Text style={[styles.modalText, { color: isDark ? '#CBD5E1' : '#475569' }]}>
                            {questions[currentIdx].explanation}
                        </Text>
                        <Pressable style={styles.modalBtn} onPress={() => setExplanationVisible(false)}>
                            <Text style={styles.modalBtnText}>OK</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.05)',
        zIndex: 10,
        paddingBottom: 12,
        marginBottom: 0,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 12,
    },
    backButton: {
        padding: 4,
    },
    timerContainer: {
        alignItems: 'center',
    },
    timerText: {
        fontSize: 18,
        fontWeight: '800',
    },
    headerActions: {
        minWidth: 32,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 12,
    },
    paginationContent: {
        paddingHorizontal: 16,
        gap: 6,
        alignItems: 'center',
    },
    pageDot: {
        width: 24, // Rectangle pill
        height: 6,
        borderRadius: 3,
        marginRight: 4,
    },
    pageNumberBox: {
        width: 30,
        height: 30,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 6,
    },
    pageNumberText: {
        fontSize: 14,
        fontWeight: '600',
    },
    // Content
    scrollContent: {
        padding: 20,
        paddingBottom: 50,
        flexGrow: 1,
    },
    imageArea: {
        width: '100%',
        aspectRatio: 16 / 9,
        borderRadius: 16,
        marginBottom: 24,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    qText: {
        fontSize: 16,
        lineHeight: 22,
        fontWeight: '600',
        marginBottom: 16,
    },
    optionsList: {
        gap: 8,
    },
    optionBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: 'transparent', // Default no border
        // Light shadow for depth
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 3,
        elevation: 1,
    },
    radioCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        marginRight: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fBadge: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
        marginRight: 12,
    },
    fBadgeText: {
        fontSize: 14,
        fontWeight: '700',
    },
    optText: {
        flex: 1,
        fontSize: 16,
        fontWeight: '500',
    },
    // Actions
    actionRow: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 24,
    },
    actionButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        borderRadius: 12,
        gap: 8,
    },
    actionBtnText: {
        fontSize: 15,
        fontWeight: '600',
    },
    // Modal
    modalBg: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        padding: 24,
    },
    modalCard: {
        borderRadius: 24,
        padding: 24,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 12,
    },
    modalText: {
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 24,
    },
    modalBtn: {
        backgroundColor: '#3B82F6',
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderRadius: 12,
    },
    modalBtnText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default TicketDetailScreen;
