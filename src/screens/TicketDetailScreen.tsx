import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, Alert, Dimensions, FlatList, Image, Animated } from 'react-native';
import { ScreenLayout } from '../components/ScreenLayout';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const QUESTION_WIDTH = width;

// Mock Data Generator
const generateQuestions = (ticketId: number) => {
    return Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        text: `${ticketId}-bilet, ${i + 1}-savol. Haydovchi chorrahada qanday harakatlanishi kerakligini ko'rsating. Ushbu vaziyatda kim ustunlikka ega?`,
        image: null,
        options: [
            { id: '1', text: 'Birinchi o\'tish kerak, chunki u asosiy yo\'lda harakatlanmoqda' },
            { id: '2', text: 'O\'ng tomondagi avtomobilga yo\'l berish kerak' },
            { id: '3', text: 'To\'xtash va barcha transport vositalarini o\'tkazib yuborish kerak' },
            { id: '4', text: 'Chorrahaga kirish taqiqlanadi' },
        ],
        correctOptionId: String((i % 4) + 1),
        explanation: `Ushbu vaziyatda Yo'l harakati qoidalarining tegishli bandiga asosan, teng ahamiyatli yo'llar kesishuvida o'ng tomondan kelayotgan transport vositasiga yo'l berish shart.`
    }));
};

export const TicketDetailScreen = ({ route, navigation }: any) => {
    const { ticketNumber } = route.params;
    const { isDark } = useTheme();
    const { t } = useTranslation();

    // State
    const [questions] = useState(() => generateQuestions(ticketNumber));
    const [currentIdx, setCurrentIdx] = useState(0);
    const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});
    const [results, setResults] = useState<{ [key: number]: boolean }>({});
    const [isExplanationVisible, setExplanationVisible] = useState(false);
    const [isFinished, setFinished] = useState(false);

    const flatListRef = useRef<FlatList>(null);
    const paginationScrollRef = useRef<ScrollView>(null);

    // Animations
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(20)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }),
            Animated.spring(slideAnim, {
                toValue: 0,
                friction: 8,
                useNativeDriver: true,
            })
        ]).start();
    }, []);

    // Timer
    useEffect(() => {
        if (isFinished) return;
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

    // Format Number (01, 02)
    const formatNumber = (num: number) => num < 10 ? `0${num}` : num;

    // Timer Format
    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${formatNumber(m)}:${formatNumber(s)}`;
    };

    const handleAnswer = (optionId: string) => {
        if (answers[currentIdx] || isFinished) return;

        const isCorrect = optionId === questions[currentIdx].correctOptionId;

        setAnswers(prev => ({ ...prev, [currentIdx]: optionId }));
        setResults(prev => ({ ...prev, [currentIdx]: isCorrect }));

        if (isCorrect) {
            setTimeout(() => {
                scrollToIndex(currentIdx + 1);
            }, 400); // Faster transition
        }
    };

    const scrollToIndex = (index: number) => {
        if (index < 0 || index >= questions.length) {
            if (index >= questions.length) setFinished(true);
            return;
        }
        flatListRef.current?.scrollToIndex({ index, animated: true });
        setCurrentIdx(index);
    };

    // Update currentIdx on scroll
    const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
            const index = viewableItems[0].index;
            if (index !== null) {
                setCurrentIdx(index);
                // Also scroll pagination strip
                if (paginationScrollRef.current) {
                    const itemSize = 48; // 38 width + 10 margin
                    const offset = (index * itemSize) - (width / 2) + (itemSize / 2);
                    paginationScrollRef.current.scrollTo({ x: offset, animated: true });
                }
            }
        }
    }).current;

    const getBoxStyle = (index: number) => {
        const isCurrent = index === currentIdx;
        const result = results[index];
        const isAnswered = answers[index] !== undefined;

        if (isCurrent) return styles.boxCurrent;
        if (isAnswered) return result ? styles.boxCorrect : styles.boxIncorrect;
        return styles.boxDefault;
    };

    const renderQuestionItem = ({ item, index }: { item: any; index: number }) => {
        const currentQuestion = item;
        return (
            <View style={{ width: QUESTION_WIDTH, flex: 1 }}>
                <ScrollView
                    contentContainerStyle={styles.questionScrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.questionContainer}>
                        {/* Image Placeholder */}
                        <View style={[styles.imageContainer, isDark && styles.cardDark]}>
                            <Ionicons name="image" size={50} color="#C7C7CC" />
                            <Text style={{ color: '#AAA', marginTop: 10, fontWeight: '500' }}>Rasm yuklanmadi</Text>
                        </View>

                        <Text style={[styles.questionText, isDark && styles.textWhite]}>
                            {currentQuestion.text}
                        </Text>

                        <View style={styles.optionsContainer}>
                            {currentQuestion.options.map((option: any, optIndex: number) => {
                                const optionId = option.id;
                                const isSelected = answers[index] === optionId;
                                const isCorrectAnswer = optionId === currentQuestion.correctOptionId;
                                const hasAnswered = answers[index] !== undefined;

                                let containerStyle: any = [styles.optionButton, isDark && styles.optionButtonDark];
                                let labelStyle: any = [styles.optionLabel];
                                let labelTextStyle: any = [styles.optionLabelText];

                                if (hasAnswered) {
                                    if (isSelected && !isCorrectAnswer) {
                                        containerStyle.push(styles.optionIncorrect);
                                        labelStyle.push(styles.labelIncorrect);
                                        labelTextStyle.push(styles.textWhite);
                                    } else if (isCorrectAnswer) {
                                        containerStyle.push(styles.optionCorrect);
                                        labelStyle.push(styles.labelCorrect);
                                        labelTextStyle.push(styles.textWhite);
                                    }
                                }

                                const letters = ['A', 'B', 'C', 'D'];

                                return (
                                    <TouchableOpacity
                                        key={optionId}
                                        style={containerStyle}
                                        onPress={() => handleAnswer(optionId)}
                                        activeOpacity={0.7}
                                        disabled={hasAnswered}
                                    >
                                        <View style={labelStyle}>
                                            <Text style={labelTextStyle}>{letters[optIndex]}</Text>
                                        </View>
                                        <Text style={[styles.optionText, isDark && styles.textWhite]}>{option.text}</Text>
                                        {hasAnswered && isCorrectAnswer && (
                                            <Ionicons name="checkmark-circle" size={24} color="#FFF" style={styles.feedbackIcon} />
                                        )}
                                        {hasAnswered && isSelected && !isCorrectAnswer && (
                                            <Ionicons name="close-circle" size={24} color="#FFF" style={styles.feedbackIcon} />
                                        )}
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    };

    return (
        <ScreenLayout edges={['top', 'left', 'right']} style={styles.container}>
            {/* Header */}
            <View style={[styles.header, isDark && styles.headerDark]}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
                    <Ionicons name="chevron-back" size={28} color={isDark ? '#FFF' : '#333'} />
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    {/* Timer */}
                    <View style={styles.timerBadge}>
                        <Ionicons name="time" size={16} color={timeLeft < 60 ? '#FF3B30' : '#007AFF'} />
                        <Text style={[styles.timerText, timeLeft < 60 && styles.textRed]}>
                            {formatTime(timeLeft)}
                        </Text>
                    </View>

                    {/* Animated Result Circle */}
                    <Animated.View style={[
                        styles.resultBadge,
                        isDark && styles.resultBadgeDark,
                        { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
                    ]}>
                        <Text style={[styles.resultText, isDark && styles.textWhite]}>
                            {Object.values(results).filter(r => r).length}/{questions.length}
                        </Text>
                    </Animated.View>
                </View>

                {answers[currentIdx] ? (
                    <TouchableOpacity onPress={() => setExplanationVisible(true)} style={styles.iconButton}>
                        <Ionicons name="bulb" size={24} color="#FFCC00" />
                    </TouchableOpacity>
                ) : (
                    <View style={{ width: 40 }} />
                )}
            </View>

            {/* Pagination Strip */}
            <View style={[styles.paginationStrip, isDark && styles.paginationStripDark]}>
                <ScrollView
                    ref={paginationScrollRef}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.paginationContent}
                >
                    {questions.map((_, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.boxCommon, getBoxStyle(index)]}
                            onPress={() => scrollToIndex(index)}
                        >
                            <Text style={[
                                styles.boxText,
                                index === currentIdx && styles.boxTextCurrent,
                                answers[index] !== undefined && styles.boxTextAnswered
                            ]}>{index + 1}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Questions Pager */}
            <FlatList
                ref={flatListRef}
                data={questions}
                renderItem={renderQuestionItem}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
                scrollEnabled={true}
                getItemLayout={(_, index) => ({
                    length: QUESTION_WIDTH,
                    offset: QUESTION_WIDTH * index,
                    index,
                })}
            />

            {/* Explanation Modal */}
            <Modal
                visible={isExplanationVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setExplanationVisible(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setExplanationVisible(false)}
                >
                    <View style={[styles.modalContent, isDark && styles.modalContentDark]}>
                        <View style={styles.modalIndicator} />
                        <Text style={[styles.modalTitle, isDark && styles.textWhite]}>To'g'ri javob izohi</Text>
                        <ScrollView style={{ maxHeight: 300 }} showsVerticalScrollIndicator={false}>
                            <Text style={[styles.explanationText, isDark && styles.textGray]}>
                                {questions[currentIdx].explanation}
                            </Text>
                        </ScrollView>
                        <TouchableOpacity
                            style={styles.closeModalButton}
                            onPress={() => setExplanationVisible(false)}
                        >
                            <Text style={styles.closeModalText}>Tushunarli</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </ScreenLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F7',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5EA',
        zIndex: 10,
    },
    headerDark: {
        backgroundColor: '#1C1C1E',
        borderBottomColor: '#333',
    },
    iconButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    timerBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F2F2F7',
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 16,
    },
    resultBadge: {
        backgroundColor: '#F2F2F7',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    resultBadgeDark: {
        backgroundColor: '#3A3A3C',
    },
    resultText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1C1C1E',
        fontVariant: ['tabular-nums'],
    },
    timerText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 6,
        color: '#333',
        fontVariant: ['tabular-nums'],
    },
    textRed: {
        color: '#FF3B30',
    },
    paginationStrip: {
        backgroundColor: '#FFF',
        height: 60,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5EA',
    },
    paginationStripDark: {
        backgroundColor: '#1C1C1E',
        borderBottomColor: '#333',
    },
    paginationContent: {
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    boxCommon: {
        width: 38,
        height: 38,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 19,
        marginHorizontal: 5,
        backgroundColor: '#F2F2F7',
    },
    boxDefault: {
        backgroundColor: '#F2F2F7',
    },
    boxCurrent: {
        backgroundColor: '#007AFF', // Blue
        transform: [{ scale: 1.1 }],
    },
    boxCorrect: {
        backgroundColor: '#34C759', // Green
    },
    boxIncorrect: {
        backgroundColor: '#FF3B30', // Red
    },
    boxText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#8E8E93',
    },
    boxTextCurrent: {
        color: '#FFF',
    },
    boxTextAnswered: {
        color: '#FFF',
    },
    questionScrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    questionContainer: {
        flex: 1,
    },
    imageContainer: {
        width: '100%',
        height: 220,
        backgroundColor: '#E5E5EA',
        borderRadius: 20,
        marginBottom: 24,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageOverlay: {
        position: 'absolute',
    },
    questionImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    questionText: {
        fontSize: 20,
        fontWeight: '700',
        color: '#000',
        marginBottom: 24,
        lineHeight: 28,
        letterSpacing: -0.4,
    },
    optionsContainer: {
        gap: 12,
    },
    optionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 16,
        borderWidth: 1.5,
        borderColor: 'transparent',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    optionButtonDark: {
        backgroundColor: '#2C2C2E',
    },
    optionCorrect: {
        backgroundColor: '#34C759',
        borderColor: '#34C759',
    },
    optionIncorrect: {
        backgroundColor: '#FF3B30',
        borderColor: '#FF3B30',
    },
    optionLabel: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#F2F2F7',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },
    labelCorrect: {
        backgroundColor: 'rgba(255,255,255,0.3)',
    },
    labelIncorrect: {
        backgroundColor: 'rgba(255,255,255,0.3)',
    },
    optionLabelText: {
        fontSize: 14,
        fontWeight: '800',
        color: '#8E8E93',
    },
    optionText: {
        flex: 1,
        fontSize: 17,
        fontWeight: '500',
        color: '#1C1C1E',
        lineHeight: 22,
    },
    feedbackIcon: {
        marginLeft: 8,
    },
    textWhite: {
        color: '#FFF',
    },
    textGray: {
        color: '#AEAEB2',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#FFF',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        paddingBottom: 40,
    },
    modalContentDark: {
        backgroundColor: '#1C1C1E',
    },
    modalIndicator: {
        width: 40,
        height: 5,
        backgroundColor: '#E5E5EA',
        borderRadius: 2.5,
        alignSelf: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 16,
        color: '#000',
    },
    explanationText: {
        fontSize: 17,
        lineHeight: 26,
        color: '#333',
    },
    closeModalButton: {
        marginTop: 24,
        backgroundColor: '#007AFF',
        borderRadius: 14,
        paddingVertical: 16,
        alignItems: 'center',
    },
    closeModalText: {
        color: '#FFF',
        fontSize: 17,
        fontWeight: '700',
    },
    cardDark: {
        backgroundColor: '#2C2C2E',
    },
});

export default TicketDetailScreen;
