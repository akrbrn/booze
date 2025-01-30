document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navOverlay = document.getElementById('navOverlay');
    const navLinks = document.querySelectorAll('#navMenu a'); // ナビゲーション内のリンクを取得
    const video = document.getElementById('loading-video');
    const videoContainer = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    const singleGachaButton = document.getElementById('single-gacha-button');
    const gifImage = document.getElementById('gif-image');
    const gifContainer = document.getElementById('gif-container');
    const gifDuration = 3000;
    const sections = document.querySelectorAll('.section');
    const triggerPoint = window.innerHeight * 0.8;
    const isFirstLoad = !sessionStorage.getItem('isFirstLoad');

    // ハンバーガーメニューの処理
    const closeMenu = () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        navOverlay.classList.remove('active');
    };

    const toggleMenu = () => {
        const isMenuOpen = menuToggle.classList.contains('active');
        if (isMenuOpen) {
            closeMenu();
        } else {
            menuToggle.classList.add('active');
            navMenu.classList.add('active');
            navOverlay.classList.add('active');
        }
    };

    menuToggle.addEventListener('click', toggleMenu);
    navOverlay.addEventListener('click', closeMenu); // オーバーレイをクリックしたら閉じる

    // ナビゲーションリンクをクリックした際の処理
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu); // 各リンクに closeMenu を設定
    });

    // 初回ロード時の処理
    if (isFirstLoad) {
        let isVideoEnded = false;

        // 動画が終了した場合の処理
        video.addEventListener('ended', () => {
            isVideoEnded = true;
            videoContainer.style.transition = 'opacity 0.5s';
            videoContainer.style.opacity = '0';
            setTimeout(() => {
                videoContainer.style.display = 'none';
                mainContent.style.display = 'block';
            }, 500);
        });

        // 動画がロードされた場合のフォールバック処理（タイムアウト）
        video.onloadeddata = () => {
            setTimeout(() => {
                if (!isVideoEnded) {
                    videoContainer.style.transition = 'opacity 0.5s';
                    videoContainer.style.opacity = '0';
                    setTimeout(() => {
                        videoContainer.style.display = 'none';
                        mainContent.style.display = 'block';
                    }, 500);
                }
            }, video.duration * 1000); // 動画の再生時間に基づくタイムアウト
        };

        sessionStorage.setItem('isFirstLoad', true);
    } else {
        videoContainer.style.display = 'none';
        mainContent.style.display = 'block';
    }

    // 単発ガチャ
    singleGachaButton.addEventListener('click', () => {
        const selectedItems = Array.from(document.querySelectorAll('.list-item input[type="checkbox"]:checked'))
            .map(checkbox => checkbox.value);

        if (selectedItems.length > 0) {
            const randomItem = selectedItems[Math.floor(Math.random() * selectedItems.length)];
            gifImage.src = 'images/gacha.GIF?timestamp=' + new Date().getTime();
            gifContainer.style.display = 'flex';
            setTimeout(() => {
                const resultPageUrl = `result.html?item=${encodeURIComponent(randomItem)}`;
                window.location.href = resultPageUrl;
            }, gifDuration);
        } else {
            alert('単発ガチャの対象を1つ以上選択してください！');
        }
    });

    // スクロール時のアニメーション
    const handleScroll = () => {
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < triggerPoint) {
                section.classList.add('visible');
            }
        });
    };
    document.addEventListener('scroll', handleScroll);
    handleScroll();
});


document.querySelectorAll('.list-header').forEach(header => {
    header.addEventListener('click', (event) => {
        const listItems = header.nextElementSibling; // 次の<ul>を取得
        const icon = header.querySelector('.toggle-icon'); // アイコンを取得

        // チェックボックスがクリックされた場合は、開閉を防ぐ
        if (!event.target.closest('input[type="checkbox"]')) {
            listItems.classList.toggle('hidden'); // リストの表示・非表示を切り替え
        }

        // アイコンの更新
        if (icon) {
            if (listItems.classList.contains('hidden')) {
                icon.textContent = '＋'; // リストが閉じているとき
            } else {
                icon.textContent = '−'; // リストが開いているとき
            }
        }
    });
});

// ジャンルのチェックボックスをクリックした際に、リスト内のチェックボックスを制御する
document.querySelectorAll('.single-all-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', (event) => {
        const genreContainer = checkbox.closest('.genre'); // 親のジャンルを取得
        const checkboxes = genreContainer.querySelectorAll('input[type="checkbox"]:not(.single-all-checkbox)'); // 「全選択 / 解除」を除くチェックボックス

        // チェックボックスの状態に合わせて全選択 / 解除
        checkboxes.forEach(item => item.checked = event.target.checked);
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
        gifImage.src = "images/gacha.GIF?timestamp=" + new Date().getTime();

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
    gifImage.src = 'images/gacha.GIF?timestamp=' + new Date().getTime();

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

            // コメントを localStorage に保存
            saveCommentsToLocalStorage();
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

                // コメント削除後、localStorageも更新
                saveCommentsToLocalStorage();
            });

            // コメント要素を構築
            commentElement.appendChild(metaElement); // ペンネームと年代
            commentElement.appendChild(commentContent); // コメント本文
            commentElement.appendChild(deleteButton); // 削除ボタン

            // リストに追加
            commentList.appendChild(commentElement);
        }

        // localStorage からコメントをロード
        function loadCommentsFromLocalStorage() {
            const comments = JSON.parse(localStorage.getItem("comments")) || [];
            comments.forEach(comment => {
                addCommentToList(comment.penName, comment.age, comment.commentText);
            });
        }

        // コメントを localStorage に保存
        function saveCommentsToLocalStorage() {
            const comments = [];
            const commentElements = document.querySelectorAll(".comment");

            commentElements.forEach(element => {
                const meta = element.querySelector(".meta").textContent;
                const commentText = element.querySelector(".comment-text").textContent;

                // metaからペンネームと年代を抽出
                const [penName, age] = meta.replace(/[\(\)]/g, "").split(" ");

                comments.push({
                    penName,
                    age,
                    commentText
                });
            });

            // localStorage に保存
            localStorage.setItem("comments", JSON.stringify(comments));
        }

        // ページ読み込み時にコメントをロード
        window.onload = loadCommentsFromLocalStorage;
    
//-----------------------ここから上長谷川