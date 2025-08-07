
document.addEventListener('DOMContentLoaded', function() {
    const drawButton = document.getElementById('drawButton');
    const resetButton = document.getElementById('resetButton');
    const resultContainer = document.getElementById('result');
    const selectedNumbersDiv = document.getElementById('selectedNumbers');
    const loadingAnimation = document.getElementById('loadingAnimation');
    
    drawButton.addEventListener('click', drawNumbers);
    resetButton.addEventListener('click', resetDraw);
    
    function drawNumbers() {
        // SweetAlert2 확인 대화상자
        Swal.fire({
            title: '청소당번을 뽑으시겠습니까?',
            text: '1번부터 28번까지 중에서 4명을 랜덤으로 선택합니다',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: '<i class="fas fa-dice me-2"></i>네, 뽑겠습니다!',
            cancelButtonText: '<i class="fas fa-times me-2"></i>취소',
            reverseButtons: true,
            customClass: {
                confirmButton: 'btn btn-primary me-2',
                cancelButton: 'btn btn-secondary'
            },
            buttonsStyling: false
        }).then((result) => {
            if (result.isConfirmed) {
                startDrawing();
            }
        });
    }
    
    function startDrawing() {
        // 버튼 숨기고 로딩 표시
        drawButton.classList.add('d-none');
        loadingAnimation.classList.remove('d-none');
        
        // 로딩 시간 시뮬레이션 (2초)
        setTimeout(() => {
            // 1부터 28까지의 숫자 배열 생성
            const numbers = Array.from({length: 28}, (_, i) => i + 1);
            
            // 4개의 랜덤한 숫자 선택
            const selectedNumbers = [];
            
            for (let i = 0; i < 4; i++) {
                const randomIndex = Math.floor(Math.random() * numbers.length);
                selectedNumbers.push(numbers[randomIndex]);
                numbers.splice(randomIndex, 1); // 선택된 숫자는 제거하여 중복 방지
            }
            
            // 선택된 숫자들을 오름차순으로 정렬
            selectedNumbers.sort((a, b) => a - b);
            
            // 로딩 숨기고 결과 표시
            loadingAnimation.classList.add('d-none');
            displayResults(selectedNumbers);
            
        }, 2000);
    }
    
    function displayResults(numbers) {
        selectedNumbersDiv.innerHTML = '';
        
        // 결과 컨테이너 표시
        resultContainer.classList.remove('d-none');
        resultContainer.classList.add('fade-in-up');
        
        // 숫자들을 순차적으로 표시
        numbers.forEach((number, index) => {
            setTimeout(() => {
                const numberElement = document.createElement('div');
                numberElement.className = 'number-badge';
                numberElement.innerHTML = `<span>${number}</span>`;
                selectedNumbersDiv.appendChild(numberElement);
                
                // 마지막 숫자가 표시된 후 성공 메시지 표시
                if (index === numbers.length - 1) {
                    setTimeout(() => {
                        showSuccessMessage(numbers);
                        resetButton.classList.remove('d-none');
                    }, 500);
                }
            }, index * 300);
        });
    }
    
    function showSuccessMessage(numbers) {
        const numbersText = numbers.join('번, ') + '번';
        
        Swal.fire({
            title: '🎉 청소당번이 선정되었습니다!',
            html: `
                <div class="text-center">
                    <p class="mb-3">선택된 당번:</p>
                    <h4 class="text-primary fw-bold">${numbersText}</h4>
                    <p class="text-muted mt-3">수고해주세요! 😊</p>
                </div>
            `,
            icon: 'success',
            confirmButtonText: '<i class="fas fa-check me-2"></i>확인',
            customClass: {
                confirmButton: 'btn btn-success'
            },
            buttonsStyling: false,
            timer: 5000,
            timerProgressBar: true
        });
    }
    
    function resetDraw() {
        Swal.fire({
            title: '다시 뽑으시겠습니까?',
            text: '현재 결과가 초기화됩니다',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '<i class="fas fa-redo me-2"></i>네, 다시 뽑겠습니다',
            cancelButtonText: '<i class="fas fa-times me-2"></i>취소',
            reverseButtons: true,
            customClass: {
                confirmButton: 'btn btn-warning me-2',
                cancelButton: 'btn btn-secondary'
            },
            buttonsStyling: false
        }).then((result) => {
            if (result.isConfirmed) {
                performReset();
            }
        });
    }
    
    function performReset() {
        // 결과 숨기기
        resultContainer.classList.add('d-none');
        resetButton.classList.add('d-none');
        
        // 숫자 초기화
        selectedNumbersDiv.innerHTML = '';
        
        // 뽑기 버튼 다시 표시
        drawButton.classList.remove('d-none');
        
        // 초기화 완료 메시지
        Swal.fire({
            title: '초기화 완료!',
            text: '새로운 청소당번을 뽑을 수 있습니다',
            icon: 'info',
            timer: 1500,
            showConfirmButton: false,
            toast: true,
            position: 'top-end'
        });
    }
    
    // 페이지 로드 시 환영 메시지
    setTimeout(() => {
        Swal.fire({
            title: '환영합니다! 👋',
            text: '공정한 청소당번 뽑기 시스템입니다',
            icon: 'info',
            timer: 2000,
            showConfirmButton: false,
            toast: true,
            position: 'top-end'
        });
    }, 1000);
});
