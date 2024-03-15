import { useNavigation } from 'expo-router'
import { RFValue } from 'react-native-responsive-fontsize'

import { SignInSocialButton } from '@/components/SignInSocialButton'
import {
  Container,
  Title,
  Header,
  TitleWrapper,
  SignInTitle,
  Footer,
  FooterWrapper,
} from './styles'

import LogoSvg from './../../assets/logo.svg'
import GoogleSvg from '@/assets/google.svg'
import AppleSvg from '@/assets/apple.svg'

export default function SignIn() {
  const navigation = useNavigation()

  function redirectAfterLogin() {
    navigation.navigate('index/index' as never)
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg
            width={RFValue(120)}
            height={RFValue(68)}
            onPress={redirectAfterLogin}
          />
          <Title>
            Controle suas {'\n'}finanças de {'\n'}forma simples
          </Title>
        </TitleWrapper>

        <SignInTitle>
          Faça seu login com {'\n'}uma das contas abaixo
        </SignInTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          <SignInSocialButton title="Entrar com Google" svg={GoogleSvg} />

          <SignInSocialButton title="Entrar com Apple" svg={AppleSvg} />
        </FooterWrapper>
      </Footer>
    </Container>
  )
}
