document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navOverlay = document.getElementById('navOverlay');
    

    // メニューの開閉を切り替える関数
    const toggleMenu = () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        navOverlay.classList.toggle('active');
    };

    // ハンバーガーメニュークリックでメニュー表示
    menuToggle.addEventListener('click', toggleMenu);

    // オーバーレイクリックでメニュー非表示
    navOverlay.addEventListener('click', toggleMenu);

    // ナビゲーションリンククリックでスムーズスクロール & メニューを閉じる
    document.querySelectorAll('#navMenu a').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();

            // 対象セクションへスムーズスクロール
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'center' // 要素が画面中央に来るように設定
                });
            }

            // メニューを閉じる
            toggleMenu();
        });
    });
});

const isFirstLoad = sessionStorage.getItem('isFirstLoad');

document.addEventListener("DOMContentLoaded", function() {
    const video = document.getElementById("loading-video");
    const videoContainer = document.getElementById("loading-screen");
    const mainContent = document.getElementById("main-content");
    const sections = document.querySelectorAll('.section');
    const triggerPoint = window.innerHeight * 0.8; // トリガー位置（画面下から80%）

    if (!isFirstLoad) {
        window.addEventListener('load', () => {
            const loadingScreen = document.getElementById('loading-screen');
            // const mainContent = document.getElementById('main-content');
        
             // 動画がロードされるまで待つ
            loadingVideo.onloadeddata = () => {
                // 動画の準備完了後にフェードアウト開始
                setTimeout(() => {
                    loadingScreen.style.transition = 'opacity 0.5s';
                    loadingScreen.style.opacity = '0';
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                    }, 500); // フェードアウトのタイミングに合わせる
                }, 3000); // 必要に応じて再生時間を設定
            };
        });
        // 動画が終了したらトップページを表示
    video.addEventListener("ended", function() {
        videoContainer.style.display = "none"; // 動画コンテナを非表示
        mainContent.style.display = "block"; // トップページを表示

    const handleScroll = () => {
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < triggerPoint) {
                section.classList.add('visible');
            }
        });
    };

      // スクロール時に処理
    document.addEventListener('scroll', handleScroll);

      // ページ読み込み時に一度チェック
handleScroll();
    });
        // セッションストレージにフラグを保存
        sessionStorage.setItem('isFirstLoad', true);
    } else {
        // 2回目以降のアクセス時の処理を記述
            videoContainer.style.display = "none"; // 動画コンテナを非表示
            mainContent.style.display = "block"; // トップページを表示

        const handleScroll = () => {
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                if (rect.top < triggerPoint) {
                    section.classList.add('visible');
                }
            });
        };
    
          // スクロール時に処理
        document.addEventListener('scroll', handleScroll);
    
          // ページ読み込み時に一度チェック
        handleScroll();
        cnsole.log('2回目以降のアクセスです');
    }

    
});

// window.addEventListener('load', () => {
//     const loadingScreen = document.getElementById('loading-screen');
//     // const mainContent = document.getElementById('main-content');

//      // 動画がロードされるまで待つ
//     loadingVideo.onloadeddata = () => {
//         // 動画の準備完了後にフェードアウト開始
//         setTimeout(() => {
//             loadingScreen.style.transition = 'opacity 0.5s';
//             loadingScreen.style.opacity = '0';
//             setTimeout(() => {
//                 loadingScreen.style.display = 'none';
//             }, 500); // フェードアウトのタイミングに合わせる
//         }, 3000); // 必要に応じて再生時間を設定
//     };
// });


document.querySelectorAll('.list-header').forEach(header => {
        header.addEventListener('click', () => {
            const listItems = header.nextElementSibling;
            listItems.classList.toggle('hidden');
        });
    });

    const singleGachaButton = document.getElementById('single-gacha-button');
    const gifContainer = document.getElementById('gif-container');
    const gifImage = document.getElementById('gif-image');
    const gifDuration = 3000; // GIFの再生時間（ミリ秒）
    // ボタンを押したときにランダム抽選
document.getElementById('single-gacha-button').addEventListener('click', () => {
    
    singleGachaButton.addEventListener('click', () => {
        // GIFのキャッシュを防ぐ
        gifImage.src = 'images/gacha.gif?timestamp=' + new Date().getTime();

        // GIFコンテナを表示
        gifContainer.style.display = 'flex';

        // 再生後に遷移
        setTimeout(() => {
            const resultPageUrl = `result.html?item=${encodeURIComponent(randomItem)}`;
            window.location.href = resultPageUrl;
        }, gifDuration);
    });


    // チェックされたチェックボックスを全て取得
    const checkedItems = Array.from(document.querySelectorAll('.list-item input[type="checkbox"]:checked'));

    // チェックされたものがない場合のエラー処理
    if (checkedItems.length === 0) {
        alert('チェックボックスから1つ以上選択してください！');
        return; // 処理を終了
    };

    //チェックされたアイテムの中からランダムに1つ選ぶ
    const randomItem = checkedItems[Math.floor(Math.random() * checkedItems.length)].value;

  // 結果を別ページに渡して遷移
// const resultPageUrl = `result.html?item=${encodeURIComponent(randomItem)}`;
// window.location.href = resultPageUrl;
});
// チェックボックスを初期からチェック済みにする
document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => checkbox.checked = true);
});


//カクテルガチャここから↓

document.querySelectorAll('.fruit-list').forEach(header => {
    header.addEventListener('click', () => {
        const listItems = header.nextElementSibling;
        listItems.classList.toggle('hidden');
    });
});
document.querySelectorAll('.vegetable-list').forEach(header => {
    header.addEventListener('click', () => {
        const listItems = header.nextElementSibling;
        listItems.classList.toggle('hidden');
    });
});


const doubleGachaButton = document.getElementById('double-gacha-button');

doubleGachaButton.addEventListener('click', () => {
    
});

    // カクテルボタンを押したときにランダム抽選
    document.addEventListener("DOMContentLoaded", () => {
        // リストを取得する
        const getSelectedItem = (listClass) => {
            const checkedItem = document.querySelector(`.${listClass} input[type="checkbox"]:checked`);
            return checkedItem ? checkedItem.value : null;
        };
    
         // チェックされたチェックボックスを全て取得
        const checkedItems = Array.from(document.querySelectorAll('.list-item-sake input[type="checkbox"]:checked'));
        const checkedItems02 = Array.from(document.querySelectorAll('.list-item-wari input[type="checkbox"]:checked'));

        
        //チェックされたアイテムの中からランダムに1つ選ぶ
        const randomItem = checkedItems[Math.floor(Math.random() * checkedItems.length)].value;
        const randomItem02 = checkedItems02[Math.floor(Math.random() * checkedItems02.length)].value;


        // ボタンをクリックしたの処理
        const handleButtonClick = () => {

            // GIFのキャッシュを防ぐ
    gifImage.src = 'images/gacha.gif?timestamp=' + new Date().getTime();

    // GIFコンテナを表示
    gifContainer.style.display = 'flex';

    // 再生後に遷移
    setTimeout(() => {
        const url = `result2.html?fruit=${encodeURIComponent(fruitSelected)}&vegetable=${encodeURIComponent(vegetableSelected)}`;
            window.location.href = url;
    }, 3000);
            const fruitSelected = randomItem;
            const vegetableSelected = randomItem02;

            if (!fruitSelected || !vegetableSelected) {
                alert("１つずつ選んでください");
                return;
            }

        };
    
        // ボタンの機能
        const gachaButton = document.getElementById("double-gacha-button");
        if (gachaButton) {
            gachaButton.addEventListener("click", handleButtonClick);
        }
    });

    document.addEventListener("DOMContentLoaded", () => {
        const commentInput = document.getElementById("commentInput");
        const penNameInput = document.getElementById("pen-name");
        const ageInput = document.getElementById("age");
        const submitButton = document.getElementById("submitComment");
        const commentList = document.getElementById("commentList");
    
        // コメントを投稿する機能
        submitButton.addEventListener("click", () => {
            const commentText = commentInput.value.trim();
            const penName = penNameInput.value.trim();
            const age = ageInput.value;
    
            // バリデーションチェック
            if (commentText === "" || penName === "" || age === "") {
                alert("ペンネーム、年代、コメントを入力してください！");
                return;
            }
    
            // コメントをリストに追加
            addCommentToList(penName, age, commentText);
    
            // 入力欄をクリア
            commentInput.value = "";
            penNameInput.value = "";
            ageInput.value = "";
        });
    
        // コメントをリストに追加する関数
        function addCommentToList(penName, age, commentText) {
            const commentElement = document.createElement("div");
            commentElement.className = "comment";
    
            // ペンネームと年代の表示
            const metaElement = document.createElement("div");
            metaElement.className = "meta";
            metaElement.textContent = `${penName} (${age})`;
    
            // コメント本文の表示
            const commentContent = document.createElement("span");
            commentContent.className = "comment-text";
            commentContent.textContent = commentText;
    
            // 削除ボタン
            const deleteButton = document.createElement("button");
            deleteButton.className = "delete-button";
            deleteButton.textContent = "削除";
            deleteButton.addEventListener("click", () => {
                // コメントを削除
                commentList.removeChild(commentElement);
            });
    
            // コメント要素を構築
            commentElement.appendChild(metaElement); // ペンネームと年代
            commentElement.appendChild(commentContent); // コメント本文
            commentElement.appendChild(deleteButton); // 削除ボタン
    
            // リストに追加
            commentList.appendChild(commentElement);
        }
    });
    

    //フロントエンドからAPIとの通信
    fetch('/api/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment: commentText }),
    })
    .then(response => response.json())
    .then(data => {
        console.log("コメントが保存されました:", data);
    });
    
//結果の画像を送る
    const singleButton = document.getElementById("single-gacha-button");
singleButton.addEventListener("click", () => {
    const selectedItems = Array.from(singleListCheckboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

    if (selectedItems.length > 0) {
        const randomItem = selectedItems[Math.floor(Math.random() * selectedItems.length)];
        // 結果ページにランダムアイテムを渡す
        window.location.href = `result.html?single=${encodeURIComponent(randomItem)}`;
    } else {
        alert("単発ガチャの対象を1つ以上選択してください！");
    }
});


//-----------------------ここから上長谷川





// // 全てのジャンル見出しを取得
// const headers = document.querySelectorAll('.list-header');

// headers.forEach(header => {
//     header.addEventListener('click', () => {
//         // 対象のリストアイテムを取得
//         const listItems = header.nextElementSibling;
//         // 表示状態を切り替え
//         listItems.classList.toggle('hidden');
//     });
// });
//   // チェックボックスの状態を保存
// const saveSelection = () => {
//     const selectedItems = [];
//     checkboxes.forEach((checkbox) => {
//         if (checkbox.checked) {
//             selectedItems.push(checkbox.value);
//         }
//     });
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedItems));
// };

// // ページロード時に選択状態を復元
// const loadSelection = () => {
//     const savedItems = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
//     checkboxes.forEach((checkbox) => {
//         checkbox.checked = savedItems.includes(checkbox.value);
//     });
// };

// // イベントリスナーを追加
// checkboxes.forEach((checkbox) => {
//     checkbox.addEventListener("change", saveSelection);
// });

// // 初期化：状態を復元
// loadSelection();

// // 結果ページへのリンクを動的に生成
// document.getElementById("result-button").addEventListener("click", () => {
//     const selectedItems = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
//     if (selectedItems.length > 0) {
//         const randomItem = selectedItems[Math.floor(Math.random() * selectedItems.length)];
//         // GIFアニメーションを表示
//         gifContainer.style.display = "block";

//         // アニメーション後に結果ページに移動
//         setTimeout(() => {
//             window.location.href = `result.html?item=${encodeURIComponent(randomItem)}`;
//         }, 2000); // 2秒後にページ遷移（アニメーションの長さに合わせて調整）
//     } else {
//         alert("アイテムを選択してください！");
//     }
// });

// // 単発ガチャ
// const singleListCheckboxes = document.querySelectorAll('#single-gacha-list input[type="checkbox"]');
// const singleButton = document.getElementById("single-gacha-button");
// singleButton.addEventListener("click", () => {
//     const selectedItems = Array.from(singleListCheckboxes)
//         .filter(checkbox => checkbox.checked)
//         .map(checkbox => checkbox.value);

//     if (selectedItems.length > 0) {
//         const randomItem = selectedItems[Math.floor(Math.random() * selectedItems.length)];
//         window.location.href = `result.html?single=${encodeURIComponent(randomItem)}`;
//     } else {
//         alert("単発ガチャの対象を1つ以上選択してください！");
//     }
// });
//  // 2リストガチャ
// const fruitCheckboxes = document.querySelectorAll('#fruit-list input[type="checkbox"]');
// const vegetableCheckboxes = document.querySelectorAll('#vegetable-list input[type="checkbox"]');
// document.getElementById("double-gacha-button").addEventListener("click", () => {
//     const selectedFruits = Array.from(fruitCheckboxes)
//         .filter(checkbox => checkbox.checked)
//         .map(checkbox => checkbox.value);

//     const selectedVegetables = Array.from(vegetableCheckboxes)
//         .filter(checkbox => checkbox.checked)
//         .map(checkbox => checkbox.value);

// if (selectedFruits.length > 0 && selectedVegetables.length > 0) {
//          const randomFruit = selectedFruits[Math.floor(Math.random() * selectedFruits.length)];
//          const randomVegetable = selectedVegetables[Math.floor(Math.random() * selectedVegetables.length)];
//         window.location.href = `result2.html?fruit=${encodeURIComponent(randomFruit)}&vegetable=${encodeURIComponent(randomVegetable)}`;
//     } else {
//     alert("フルーツと野菜をそれぞれ1つ以上選択してください！");
//     }
// });




// document.addEventListener('DOMContentLoaded', function () {
//     // ▼ 単発ガチャ処理 ▼
//     const singleListCheckboxes = document.querySelectorAll('#single-gacha-list input[type="checkbox"]');
//     const singleButton = document.getElementById('single-gacha-button');

//     singleButton.addEventListener('click', () => {
//         const selectedItems = Array.from(singleListCheckboxes)
//             .filter(checkbox => checkbox.checked)
//             .map(checkbox => checkbox.value);

//         if (selectedItems.length > 0) {
//             const randomItem = selectedItems[Math.floor(Math.random() * selectedItems.length)];
//             window.location.href = `result.html?item=${encodeURIComponent(randomItem)}`;
//         } else {
//             alert('単発ガチャの対象を1つ以上選択してください！');
//         }
//     });

//     // ▼ 2リストガチャ処理 ▼
//     const fruitCheckboxes = document.querySelectorAll('#fruit-list input[type="checkbox"]');
//     const vegetableCheckboxes = document.querySelectorAll('#vegetable-list input[type="checkbox"]');
//     const doubleButton = document.getElementById('double-gacha-button');

//     doubleButton.addEventListener('click', () => {
//         const selectedFruits = Array.from(fruitCheckboxes)
//             .filter(checkbox => checkbox.checked)
//             .map(checkbox => checkbox.value);

//         const selectedVegetables = Array.from(vegetableCheckboxes)
//             .filter(checkbox => checkbox.checked)
//             .map(checkbox => checkbox.value);

//         if (selectedFruits.length > 0 && selectedVegetables.length > 0) {
//             const randomFruit = selectedFruits[Math.floor(Math.random() * selectedFruits.length)];
//             const randomVegetable = selectedVegetables[Math.floor(Math.random() * selectedVegetables.length)];
//             window.location.href = `result2.html?fruit=${encodeURIComponent(randomFruit)}&vegetable=${encodeURIComponent(randomVegetable)}`;
//         } else {
//             alert('フルーツと野菜をそれぞれ1つ以上選択してください！');
//         }
//     });

//     // ▼ 共通処理 ▼
//     // ジャンルリストの表示/非表示切り替え
//     document.querySelectorAll('.list-header').forEach(header => {
//         header.addEventListener('click', () => {
//             const listItems = header.nextElementSibling;
//             listItems.classList.toggle('hidden');
//         });
//     });

//     // ▼ チェックボックスの状態保存/復元 ▼
//     const STORAGE_KEY = "selected_items";
//     const checkboxes = document.querySelectorAll('input[type="checkbox"]');

//     // チェック状態を保存
//     const saveSelection = () => {
//         const selectedItems = Array.from(checkboxes)
//             .filter(checkbox => checkbox.checked)
//             .map(checkbox => checkbox.value);
//         localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedItems));
//     };

//     // チェック状態を復元
//     const loadSelection = () => {
//         const savedItems = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
//         checkboxes.forEach((checkbox) => {
//             checkbox.checked = savedItems.includes(checkbox.value);
//         });
//     };

//     // 状態保存用イベントリスナー追加
//     checkboxes.forEach((checkbox) => {
//         checkbox.addEventListener("change", saveSelection);
//     });

//     // 初期化：状態を復元
//     loadSelection();
// });
// console.log(selectedItems); // チェックされたアイテムの配列を確認
