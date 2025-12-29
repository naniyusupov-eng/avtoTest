{/* Thematic Tests Card */ }
<TouchableOpacity
    style={{ marginBottom: 24, borderRadius: 24, overflow: 'hidden', elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8 }}
    activeOpacity={0.8}
    onPress={() => navigation.navigate('ComingSoon', { title: 'Mavzulashtirilgan Testlar' })}
>
    <LinearGradient
        colors={isDark ? ['#0891B2', '#164E63'] : ['#06B6D4', '#0891B2']} // Cyan
        style={{ padding: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
    >
        <View>
            <Text style={{ fontSize: 18, fontWeight: '700', color: '#FFF', marginBottom: 4 }}>Mavzulashtirilgan Testlar</Text>
            <Text style={{ fontSize: 13, color: 'rgba(255,255,255,0.9)', fontWeight: '500' }}>Mavzular bo'yicha savollar</Text>
        </View>
        <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' }}>
            <Ionicons name="library" size={24} color="#FFF" />
        </View>
    </LinearGradient>
</TouchableOpacity>
