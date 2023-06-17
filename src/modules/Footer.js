import styles from '../css/footer.module.css';


export const Footer = () => {
    return (
        <div>
            <div className={styles.footerWrapper}>
                <div className={styles.footerNotice}>※ 운영시간 : 24/7 </div>
                <div className={styles.footerInformation}>전화번호 : 010-3089-0727 이메일 : umbrellamoss@gmail.com 대표 : 김솔미</div>
            </div>
        </div>
    )
}