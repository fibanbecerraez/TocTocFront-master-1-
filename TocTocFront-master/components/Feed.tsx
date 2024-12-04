import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import Post from './Post';
import Ads from './Ads'

const mockedPosts = [
    {
        id: '1',
        author: {
            profileImage: { uri: 'https://as1.ftcdn.net/v2/jpg/03/38/30/80/1000_F_338308078_iiXC8b9lxpxmjGKaKu4dtXHSIVfzE8qm.jpg' },
            name: 'Juan Perez',
            username: 'juanperez',
            email: 'juan@example.com',
        },
        content: 'Este es un post de ejemplo para TocToc. No me acuerdo como generar un Lorem Ipsum.',
        file: [{ uri: 'https://as1.ftcdn.net/v2/jpg/03/38/30/80/1000_F_338308078_iiXC8b9lxpxmjGKaKu4dtXHSIVfzE8qm.jpg' }],
        likes: 120,
        comments: 30,
    },
    {
        id: '2',
        author: {
            profileImage: { uri: 'https://as1.ftcdn.net/v2/jpg/03/38/30/80/1000_F_338308078_iiXC8b9lxpxmjGKaKu4dtXHSIVfzE8qm.jpg' },
            name: 'Juan Perez',
            username: 'juanperez',
            email: 'juan@example.com',
        },
        content: 'Este post no tiene imagen.',
        file: [],
        likes: 120,
        comments: 30,
    },
    {
        id: '3',
        author: {
            profileImage: { uri: 'https://as1.ftcdn.net/v2/jpg/03/38/30/80/1000_F_338308078_iiXC8b9lxpxmjGKaKu4dtXHSIVfzE8qm.jpg' },
            name: 'Juan Perez',
            username: 'juanperez',
            email: 'juan@example.com',
        },
        content: "Este post tiene imagen y encima un texto bastante largo. cuando pienses que tu trabajo es la puta mierda piensa en Rata Blanca que tiene que tocar mujer amante la leyenda esa del Hada y cerrar con guerrero del Arcoiris todos los dias de su vida hasta que llegue la muerte o la jubilacion o whatever comes first en centros vecinales y clubes de bochas en ocasion del cumpleaños del hijo del intendente de Despeñaderos, los carnavales de Serrezuela o en la fiesta del queso rallado de Oncativo y sacarse fotos con clase tras clase de metaleros feosFEOS con buzos polares que te abrazan te tocan el pelo y te pasan un porron hirviendo chupado por la 150 personas que fueron a verte mientras los huevos se te hierven t0cando Preludio obsesivo que rebota magicamente en la chapa de un tinglado de una fabrica recuperada y cerras los ojos recordando ese dia en que tu papa te dejo en la puerta del Conservatorio y de pronto una brisa fresca te acaricia la cara hasta que ese orco agarrado a una valla gritando CHICO CALLEJERO TOCA CHICO CALLEJERO te devuelve a esa realidad de mierda donde la Beriso que terminaron el secundario a distancia llena un estadio unico de La pLata",
        file: [{ uri: 'https://as1.ftcdn.net/v2/jpg/03/38/30/80/1000_F_338308078_iiXC8b9lxpxmjGKaKu4dtXHSIVfzE8qm.jpg' }],
        likes: 120,
        comments: 30,
    },
];


interface FeedProps {
    posts?: Array<any>;
    ads?: Array<any>;
    loading: boolean;
    onLoadMore: () => void;
    onRefresh: () => void;
    refreshing: boolean;
    onPostPress: (post: any) => void;
}

const Feed = forwardRef(({ posts = mockedPosts, ads = [], loading, onLoadMore, onRefresh, refreshing, onPostPress }: FeedProps, ref) => {
    const flatListRef = useRef(null);

    // Scroll to top
    useImperativeHandle(ref, () => ({
        scrollToTop: () => {
            flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
        },
    }));

    const interleaveAdsWithPosts = (posts, ads) => {
        const combinedData = [];
        let adIndex = 0;
    
        posts.forEach((post, index) => {
            combinedData.push(post);
    
    
            if ((index + 1) % 4 === 0 && ads.length > 0) {
                const ad = { ...ads[adIndex], isAd: true };
                combinedData.push(ad);
                adIndex = (adIndex + 1) % ads.length;
            }
        });
    
        return combinedData;
    };

    const combinedData = interleaveAdsWithPosts(posts, ads);

    const renderItem = ({ item }) => {
        if (item.isAd) {
            return (
                <Ads
                    commerceImage={item.imagePath[0]?.portraite}
                    commercePost={item.imagePath[0]?.landscape}
                    commerce={item.commerce}
                    url={item.Url}
                />
            );
        }

        return (
            <Post
                profileImage={item.author?.profileImage?.uri || null}
                name={item.author?.name}
                username={item.author?.username || item.author?.email}
                text={item.content}
                postImage={item.file?.[0]?.uri || null}
                likes={item.likes || 0}
                comments={item.comments || 0}
                onPress={() => onPostPress(item)}
            />
        );
    };

    const renderFooter = () => {
        return loading ? (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="small" color="#0000ff" />
            </View>
        ) : null;
    };

    return (
        <View style={styles.feedContainer}>
            <FlatList
                ref={flatListRef}
                data={combinedData}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                ListFooterComponent={renderFooter}
                onEndReached={onLoadMore}
                onEndReachedThreshold={0.5}
                refreshing={refreshing}
                onRefresh={onRefresh}
            />
        </View>
    );
});

const styles = StyleSheet.create({
    loaderContainer: {
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    feedContainer: {
        paddingVertical: 10,
        paddingHorizontal: 15,
    }
});

export default Feed;