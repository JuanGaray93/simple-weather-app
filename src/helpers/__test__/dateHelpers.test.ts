import {buildLocalDateByUnixTimestamp} from "../dateHelpers";

describe("buildLocalDateByUnixTimestamp", () => {
  it("converts 1633407632 to 5/10/2021", () => {
    expect(buildLocalDateByUnixTimestamp(1633407632)).toBe("5/10/2021");
  });
});  
