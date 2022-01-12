import { Checkout as SourceCheckout } from "Source/route/Checkout/Checkout.component";
import ContentWrapper from "Component/ContentWrapper";
import "./Checkout.extension.style";

export class Checkout extends SourceCheckout {
  __construct(props) {
    super.__construct(props);

    this.state = {
      currentStep: 1
    };
  }

  renderProgressBar() {
    const stepsLength = Object.keys(this.stepMap).length;
    const { checkoutStep } = this.props;
    const { url } = this.stepMap[checkoutStep];

    // console.log(checkoutStep);
    const labelArray = ["Shipping", "Review & Payments"];
    const { currentStep } = this.state;
    console.log(checkoutStep);

    if (checkoutStep === "SHIPPING_STEP") {
      this.setState({ currentStep: 1 });
    }
    if (checkoutStep === "BILLING_STEP") {
      this.setState({ currentStep: 2 });
    }

    return (
      <div className='progress'>
        <div className='progress__bar'></div>
        {labelArray.map((item, index) => (
          <div key={index} className='progress__step'>
            <div
              className={
                currentStep === index + 1 ? "bullet selectedStep" : "bullet"
              }
            >
              {index + 1}
            </div>

            <h4 className={currentStep === index + 1 ? " selectedStep" : ""}>
              {item}
            </h4>
          </div>
        ))}
      </div>
    );
  }

  render() {
    return (
      <main block='Checkout'>
        {this.renderProgressBar()}
        <ContentWrapper
          wrapperMix={{ block: "Checkout", elem: "Wrapper" }}
          label={__("Checkout page")}
        >
          {this.renderSummary(true)}
          <div block='Checkout' elem='Step'>
            {this.renderTitle()}
            {this.renderGuestForm()}
            {this.renderStep()}
            {this.renderLoader()}
          </div>
          <div>
            {this.renderSummary()}
            {this.renderPromo()}
            {this.renderCoupon()}
          </div>
        </ContentWrapper>
      </main>
    );
  }
}

export default Checkout;
