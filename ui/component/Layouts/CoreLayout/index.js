import CoreLayout from './CoreLayout'
import { connect } from 'react-redux'
import { web3Connect } from '../../store/web3Reducer'

const mapDispatchToProps = {
  web3Connect
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout)
